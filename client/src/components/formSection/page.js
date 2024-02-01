const FormSection = ({children})=>  {
    return (
      <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
           {children}
        </div>
      </div>
    </section>
    )
    }

    export default FormSection