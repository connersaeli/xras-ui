const Alert = ({ children, color }) => {
  return (
    <div className={`alert alert-${color} mt-3`} role="alert">
      {children}
    </div>
  );
};

export default Alert;
