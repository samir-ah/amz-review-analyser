import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import RegisterLogo from '../../assets/hyper.svg';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { useAuth } from '../../context/AuthContext';
import { useHttpClient } from '../../hooks/UseHttp';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { Button } from 'primereact/button';

interface IFormInputs {
  email: string;
  password: string;
}
function RegisterForm() {
  const auth = useAuth();
  const toast = useToast();
  const { isLoading, axiosRequest } = useHttpClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reset,
  } = useForm<IFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const result = await login(data.email, data.password);
      auth.login(result.data.token);
    } catch (error: any) {
      toast?.current?.show({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Identifiants incorrectes',
        life: 3000,
      });
    }
  };
  async function login(email: string, password: string) {
    return await axiosRequest('/api/login', {
      data: { username: email, password },
      method: 'post',
    });
  }
  const getFormErrorMessage = (name: keyof IFormInputs) => {
    return errors[name] && <small className='p-error'>{errors[name]?.message}</small>;
  };

  return (
    <div className='surface-card bg-surface-700 p-4 shadow-2 border-round w-full md:w-6 '>
      <div className='text-center mb-5'>
        <img src={RegisterLogo} alt='hyper' height={50} className='mb-3' />
        <div className='text-900 text-3xl font-medium mb-3'>Bienvenue</div>
        <span className='text-600 font-medium line-height-3'>Pas de compte ?</span>

        <Link
          to={'/register'}
          className='font-medium no-underline ml-2 text-blue-500 cursor-pointer'
        >
          S&apos;inscrire !
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='email' className='block text-900 font-medium mb-2'>
          Email
        </label>
        <Controller
          name='email'
          control={control}
          rules={{
            required: 'Entrez votre email',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Email invalide. ex: example@email.com',
            },
          }}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { ref, ...field }, fieldState }) => (
            <InputText
              id={field.name}
              {...field}
              placeholder='Email'
              className={classNames({ 'p-invalid': fieldState.invalid, 'w-full': true })}
            />
          )}
        />
        {getFormErrorMessage('email')}

        <label htmlFor='password' className='block text-900 font-medium mb-2 mt-3'>
          Mot de passe
        </label>

        <Controller
          name='password'
          control={control}
          rules={{ required: 'Entrez votre mot de passe' }}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { ref, ...field }, fieldState }) => (
            <Password
              id={field.name}
              {...field}
              toggleMask
              className={'w-full ' + (fieldState.invalid ? 'p-invalid' : '')}
              placeholder='Mot de passe'
              feedback={false}
              inputClassName='w-full'
            />
          )}
        />
        {getFormErrorMessage('password')}
        <div className='flex align-items-center justify-content-between mb-6 mt-3'>
          <Link
            to={'/reset-password'}
            className='font-medium no-underline ml-2 text-blue-500 cursor-pointer'
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <Button label='Se connecter' icon='pi pi-user' className='w-full' loading={isLoading} />
      </form>
    </div>
  );
}
export default RegisterForm;
