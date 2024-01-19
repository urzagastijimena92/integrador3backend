export function volverArriba(){
    const volver = document.querySelector("#volver");

    window.onscroll = () => {
        if(window.scrollY >700){
            volver.classList.remove("volver-collapse")
        }else{
            volver.classList.add("volver-collapse")
        }
    }

    const botonVolver = document.getElementById('volver');

        botonVolver.addEventListener('click', function (event) {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
}