import { Button } from 'primereact/button';
import { Theme, useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { confirmDialog } from 'primereact/confirmdialog';
import { confirmPopup } from 'primereact/confirmpopup';
import { Suspense, lazy } from 'react';

const ComingSoonAnimation = lazy(() => import('../components/lottie-animations/CoomingSoonLottie'));
function WelcomePage() {
  const { setTheme, theme } = useTheme();
  const toastRef = useToast();

  const accept = () => {
    toastRef?.current?.show({
      severity: 'info',
      summary: 'Confirmed',
      detail: 'You have accepted',
      life: 3000,
    });
  };

  const reject = () => {
    toastRef?.current?.show({
      severity: 'warn',
      summary: 'Rejected',
      detail: 'You have rejected',
      life: 3000,
    });
  };
  const confirm = () => {
    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept,
      reject,
    });
  };
  const confirm2 = (event: React.MouseEvent<HTMLElement>) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Are you sure you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => accept(),
      reject: () => reject(),
    });
  };
  return (
    <>
      <div className='grid grid-nogutter surface-0 text-800'>
        <div className='col-12 md:col-6 p-6 text-center md:text-left flex align-items-center '>
          <section>
            <span className='block text-6xl font-bold mb-1'>Create the screens your</span>
            <div className='text-6xl text-primary font-bold mb-3'>your visitors deserve to see</div>
            <p className='mt-0 mb-4 text-700 line-height-3'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>

            <Button
              label='Learn More'
              type='button'
              className='mr-3 p-button-raised'
              onClick={() => {
                toastRef?.current?.show({
                  severity: 'success',
                  summary: 'Success Message',
                  detail: 'Message Content',
                  life: 3000,
                });
              }}
            />
            <Button
              label='Live Demo'
              type='button'
              className='p-button-outlined'
              onClick={() => {
                setTheme(theme == Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
              }}
            />
          </section>
        </div>
        <div className='col-12 md:col-6 overflow-hidden'>
          <Suspense>
            <ComingSoonAnimation></ComingSoonAnimation>
          </Suspense>
        </div>
      </div>
      <Button onClick={confirm} icon='pi pi-check' label='Confirm'></Button>
      <Button onClick={confirm2} icon='pi pi-check' label='Confirm'></Button>
    </>
  );
}

export default WelcomePage;
