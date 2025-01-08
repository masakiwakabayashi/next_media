// import { ReactNode } from 'react';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";

type Props = {
  children: React.ReactNode;
}

const BaseLayout = (props: Props) => {
  const { children } = props

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row flex-1 mx-7 my-4">
        <main className="flex-1 p-4">
          {children}
        </main>
        <div className="py-4 pr-5 flex justify-center">
          <Sidebar />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BaseLayout;
