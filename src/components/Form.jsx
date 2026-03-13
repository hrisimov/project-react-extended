const Form = ({ children, form }) => {
  const error = form.formState.errors.root;

  return (
    <form className='flex flex-col gap-4'>
      {children}
      {error && (
        <div className='text-center text-sm text-red-500'>{error.message}</div>
      )}
    </form>
  );
};

export default Form;
