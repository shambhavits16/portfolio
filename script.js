const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function circleAnim(){
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove",function(dets){
    clearTimeout(timeout);
    xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX
    yprev = dets.clientY

    circleMouseFollower(xscale,yscale);
    timeout = setTimeout(function(){
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    },100);
  });
}

circleAnim();

function firstPageAnim(){
  var tl = gsap.timeline();

  tl.from("#nav",{
    y:'-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut
  })

  .to(".boundingelem",{
    y: 0,
    duration: 2,
    ease: Expo.easeInOut,
    delay: -1,
    stagger: .2
  })

  .from("#herofooter",{
    y:'-10',
    opacity: 0,
    duration: 1.5,
    delay: -1,
    ease: Expo.easeInOut
  });

}

function circleMouseFollower(xscale,yscale) {
    window.addEventListener("mousemove", function (dets) {
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
  }

circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function(elem){
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});

function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with zero if needed
  const amPm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // Convert hours to 12-hour format
  const timeString = `${hours}:${minutes} ${amPm} IST`; // Format the time

  document.getElementById('timeDisplay').textContent = timeString; // Update the content of the element
}

// Call updateTime initially to set the time when the page loads
updateTime();

// Call updateTime every second to update the time dynamically
setInterval(updateTime, 1000);

