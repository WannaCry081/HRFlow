export const ModalBox = (prop) => {
    const handleSectionClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="fixed z-10 h-screen w-screen top-0 left-0 bg-[#20262e80] p-4"
            onClick={prop.onCancel}>
            <section className={`${prop.top ? prop.top : "mt-40"} ${prop.topBreakpoint ? prop.topBreakpoint : "sm:mt-52"} max-w-[36rem] rounded-2xl bg-white mx-auto p-6 sm:p-10`} onClick={handleSectionClick}>
                {prop.children}
            </section>
        </div>
    );
};