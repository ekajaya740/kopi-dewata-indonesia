interface ToastProps {
  message: string;
}

const Toast = (props: ToastProps) => {
  return (
    <div className='toast'>
      <div className='alert alert-info'>
        <span>{props.message}</span>
      </div>
    </div>
  );
};

export default Toast;
