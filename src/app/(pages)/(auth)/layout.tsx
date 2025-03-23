import { FC, ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="bg-card border-2 border-primary p-10 rounded-md w-[500px]">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
