import{a as u,i as p,S as L}from"./assets/vendor-13e4446b.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&f(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function f(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const h="https://api.thecatapi.com/v1",S=`${h}/breeds`,b=`${h}/images/search?`,E="live_hYHqSU1vkpXeYjXQ3zdI4yWdoi0g8Rg34LE74zI7SScY4LWF3GhroxnVWF81pKGm";u.defaults.headers.common["x-api-key"]=E;function w(){return u.get(`${S}`).then(n=>n.data)}function v(n){return u.get(`${b}breed_ids=${n}`).then(o=>o.data)}const m=document.querySelector(".cat-info"),s=document.querySelector(".breed-select"),d=document.createElement("span");d.className="loader hidden";document.body.appendChild(d);function g(){d.classList.remove("hidden")}function i(){d.classList.add("hidden")}function y(){s.classList.remove("hidden")}function c(){s.classList.add("hidden")}function C(){m.classList.remove("hidden")}function a(){m.classList.add("hidden")}function I(){g(),c(),a(),w().then(n=>{i(),y(),n.forEach(({id:o,name:r})=>{s.appendChild(new Option(r,o))}),new L({select:s})}).catch(n=>{i(),c(),a(),p.error({title:"Error",message:"Oops! Something went wrong! Try reloading the page!",position:"bottomCenter",timeout:!1,color:"yellow"})})}s.addEventListener("change",O);function O(){g(),y(),a();const n=s.value;v(n).then(o=>{i(),c(),C();const r=o[0];m.innerHTML=`<img class = "img" src = "${r.url}" alt= "${r.breeds[0].name}" loading="lazy"/>
      <div class = "text-container">
<p class = "h2">${r.breeds[0].name}</p>
<p>${r.breeds[0].description}</p>
<p><span class ="subtitle">Temperament</span> : ${r.breeds[0].temperament}</p>
</div>`}).catch(o=>{i(),c(),a(),p.error({title:"Error",message:"Oops! Something went wrong! Try reloading the page!",position:"bottomCenter",timeout:5e3,backgroundColor:"yellow,",color:"yellow"})})}I();
//# sourceMappingURL=commonHelpers.js.map
