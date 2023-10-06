export const ModalBox = (prop) => {
    const handleSectionClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="fixed z-10 h-screen w-screen top-0 left-0 bg-[#20262e80] p-4"
            onClick={prop.onCancel}>
            <section className="max-w-[36rem] rounded-2xl bg-white mx-auto my-32 sm:my-56 p-6 sm:p-10" onClick={handleSectionClick}>
                {prop.children}
            </section>
        </div>
    );
};