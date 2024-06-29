let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{
  menuIcon.classList.toggle('fa-smark');
  navbar.classList.toggle('active');
}


/* ........readmore container ..........*/

  const parentContainer = document.querySelector('.read-more-container');

  parentContainer.addEventListener('click', event =>{
    const current = event.target;

    const isReadMoreBtn = current.className.includes('read-more-btn');

    if(!isReadMoreBtn) 
      return;

    const currentText = event.target.parentNode.querySelector('.read-more-text');
    currentText.classList.toggle('read-more-text--show');
    current.textContent = current.textContent.includes('Read More') ? " Read less.." : "Read More";
  

  })
/* ........... scroll section active list ...........*/

let section =document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () =>{
  section.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id=sec.getAttribute('id');

    if(top >=offset ** top < offset + height){
      navLinks.forEach.apply(links =>{
        links.classList.remove('active');
        document.querySelector('header nav a[href* =' + id + ']').classList.add('active');
      });
    };
  });

  /*.....sticky navbar .........*/

  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY >100);

  /* .... remove toggle icon and navbar ........*/
  
  menuIcon.classList.remove('fa-xmark');
  navbar.classList.remove('active');
};


/* .... scroll reveal ////*/
ScrollReveal({
   distance:'800px' ,
   duration: 2000,
  delay: 200,
 });

 ScrollReveal().reveal('.home-content,heading' ,  { origin:'top'});
 ScrollReveal().reveal('.home-img, .sercivces-container, portfolio-box, .contact-form', {origin: 'button'}
 );
 ScrollReveal().reveal('.home-contact h1, .about-img', {origin: 'left'});

ScrollReveal().reveal('.home-contact p, .about-content', {origin: 'right'});



// 
