const modelViewer = document.querySelector('#orbit-demo');
const reveal__one = document.querySelector('.reveal__one');
const reveal__two = document.querySelector('.reveal__two');
const reveal__three = document.querySelector('.reveal__three');
const reveal__four = document.querySelector('.reveal__four');
const reveal__five = document.querySelector('.reveal__five');

const reveal = gsap.utils.toArray('.reveal');
reveal.forEach((element, i) => {
    ScrollTrigger.create({
        trigger: element,
        toggleClass: 'active',
        start: "top 90%", //Animation start at this point
        end: "top -5%", //Animation end at this point
        markers: true,
        scrub: { snapTo: "labels", duration: 0.15, delay: 0.5, ease: "power3.inOut" }
    });


});

var scroll1 = ScrollTrigger.create({
    trigger: reveal__one,
    toggleClass: 'active',
        start: "top 50%", //Animation start at this point
        end: "bottom 50%", //Animation end at this point
        markers: true,
        scrub: { snapTo: "labels", duration: 0.15, delay: 0.5, ease: "power3.inOut" }
});

var scroll2 = ScrollTrigger.create({
    trigger: reveal__two,
    toggleClass: 'active',
        start: "top 50%", //Animation start at this point
        end: "bottom 50%", //Animation end at this point
        markers: true,
        scrub: { snapTo: "labels", duration: 0.15, delay: 0.5, ease: "power3.inOut" }
});

var scroll3 = ScrollTrigger.create({
    trigger: reveal__three,
    toggleClass: 'active',
        start: "top 50%", //Animation start at this point
        end: "bottom 50%", //Animation end at this point
        markers: true,
        scrub: { snapTo: "labels", duration: 0.15, delay: 0.5, ease: "power3.inOut" }
});

var scroll4 = ScrollTrigger.create({
    trigger: reveal__four,
    toggleClass: 'active',
        start: "top 50%", //Animation start at this point
        end: "bottom 50%", //Animation end at this point
        markers: true,
        scrub: { snapTo: "labels", duration: 0.15, delay: 0.5, ease: "power3.inOut" }
});

var scroll5 = ScrollTrigger.create({
    trigger: reveal__five,
    toggleClass: 'active',
        start: "top 50%", //Animation start at this point
        end: "bottom 50%", //Animation end at this point
        markers: true,
        scrub: { snapTo: "labels", duration: 0.15, delay: 0.5, ease: "power3.inOut" }
});




ScrollTrigger.create({
   // snap: 1 // snap whole page to the closest section!
});

window.addEventListener('scroll', () => {
    //modelViewer.cameraOrbit = `90deg 0deg ${window.scrollY % 100}%`; // Set the value
    //console.log(modelViewer.cameraOrbit);

});


ScrollTrigger.addEventListener("scrollEnd", () => {
    if(scroll1.isActive){
        modelViewer.cameraOrbit = `90deg 0deg `; // Set the value
    } if(scroll2.isActive){
        modelViewer.cameraOrbit = `45deg 60deg `; // Set the value
    } if(scroll3.isActive){
        modelViewer.cameraOrbit = `0deg 0deg 0`; // Set the value
    } if(scroll4.isActive){
        modelViewer.cameraOrbit = `155deg 80deg `; // Set the value
    } if(scroll5.isActive){
        modelViewer.cameraOrbit = `90deg 0 deg`;
    }
});
// scroll down arrow animation
gsap.to(".arrow", { y: 12, ease: "power1.inOut", repeat: -1, yoyo: true });

//const cameraOrbit = modelViewer.getCameraOrbit(); // Get the (possibly changed) value