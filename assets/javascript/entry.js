import "../css/app.scss";
// tengo que importar el slider.js para que lo procese webpack
// import "./slider/slider";
import "./slider/sliderDOM";
import "./maps";
import "./menu";

if (navigator.serviceWorker)
	navigator.serviceWorker.register("../sw.js");
