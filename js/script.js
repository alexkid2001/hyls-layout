document.addEventListener("DOMContentLoaded", () => {

  function animate({timing, draw, duration}) {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      // timeFraction изменяется от 0 до 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      // вычисление текущего состояния анимации
      let progress = timing(timeFraction);
  
      draw(progress); // отрисовать её
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
    });
  }

  {
    const navItems = document.querySelectorAll('.nav__item');

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        navItems.forEach(nav => {
          nav.classList.remove('nav__item_active');
        })
        item.classList.add('nav__item_active');
      })
    })
  }


  {
    const tabs = document.querySelectorAll('.tabs__item');
    const tabsContent = document.querySelectorAll('.tabs__content');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const tabAttr = tab.getAttribute('data-tab');
        console.log('tabAttr', tabAttr);
        

        for(let i = 0; i < tabs.length; i++) {
          const contentAttr = tabsContent[i].getAttribute('data-tab-content');

          if (tabAttr === contentAttr) {
            tabs[i].classList.add('tabs__item_active');
            tabsContent[i].classList.add('tabs__content_active');
          } else {
            tabs[i].classList.remove('tabs__item_active');
            tabsContent[i].classList.remove('tabs__content_active');
          }
          

        }
      })
    })
  }

  {
    let initialMouse = 0;
    let mouseIsDown = false;
    const lock = document.querySelector('.swipe-button__lock'); //slider = $('#slider');
    const swipeButton = document.querySelector('.swipe-button');
    // const swipeButtonRect = swipeButton.getBoundingClientRect();
    // const lockRect = lock.getBoundingClientRect();
    // const slideMovementTotal = swipeButtonRect.width - lockRect.width - 3;

    const initSlideMovementTotal = () => {
      const swipeButtonRect = swipeButton.getBoundingClientRect();
      const lockRect = lock.getBoundingClientRect();
      return swipeButtonRect.width - lockRect.width - 3;
    }

    const touchStart = (e) => {
      e.preventDefault();
      mouseIsDown = true;
      initialMouse = e.clientX || e.touches[0].pageX;
    }

    const touchMove = (e) => {
      const slideMovementTotal = initSlideMovementTotal();
      const isLock = swipeButton.classList.contains('swipe-button_lock')

      if (!mouseIsDown) {
        return;
      }

      const currentMouse = e.clientX || e.touches[0].pageX;
      const relativeMouse = currentMouse - initialMouse;
      // const slidePercent = 1 - (relativeMouse / slideMovementTotal);
      console.log('slideMovementTotal', slideMovementTotal);
      
      console.log('relativeMouse', relativeMouse);
      console.log('initialMouse', initialMouse);
       
      

      if ((relativeMouse > 0) && !isLock) {
        if (relativeMouse >= slideMovementTotal + 3) {
          lock.style.left= slideMovementTotal + 'px';
          return;
        }
        lock.style.left= relativeMouse + 3 + 'px';
      }

      if ((relativeMouse < 0) && isLock) {
        if (Math.abs(relativeMouse) >= slideMovementTotal + 3) {
          lock.style.left= '';
          return;
        }
        lock.style.left= slideMovementTotal + relativeMouse + 3 + 'px';
      }

      // if (relativeMouse <= 0) {
      //   lock.style = '';
      //   return;
      // }
      
    }

    const swipeToggle = (e) => {
      const slideMovementTotal = initSlideMovementTotal();

      e.preventDefault();
      swipeButton.classList.toggle('swipe-button_lock');
      if (swipeButton.classList.contains('swipe-button_lock')) {
        animate({
          duration: 200,
          timing: function(timeFraction) {
            return timeFraction;
          },
          draw: function(progress) {
            lock.style.left = progress * slideMovementTotal - 3 + 'px';
          }
        });
      } else {
        animate({
          duration: 200,
          timing: function(timeFraction) {
            return timeFraction;
          },
          draw: function(progress) {
            lock.style.left = slideMovementTotal - progress * slideMovementTotal + 3 + 'px';
          }
        });
      }
      
    }

    const touchEnd = (e) => {
      const slideMovementTotal = initSlideMovementTotal();

      if (!mouseIsDown) {
        return;
      }
        
      mouseIsDown = false;
      const currentMouse = e.clientX || e.changedTouches[0].pageX;
      const relativeMouse = currentMouse - initialMouse;

      // console.log('currentMouse', currentMouse);
      // console.log('relativeMouse', relativeMouse);
      // console.log('slideMovementTotal', slideMovementTotal);
      
      

      if (!relativeMouse) {
        swipeToggle(e);
      }

      if (relativeMouse > 0) {
        if (relativeMouse < slideMovementTotal - 100) {
          lock.style = '';
          return;
        }        
        swipeButton.classList.add('swipe-button_lock');
        lock.style = '';
      } else {
        if (Math.abs(relativeMouse) < slideMovementTotal - 100) {
          lock.style = '';
          return;
        }        
        swipeButton.classList.remove('swipe-button_lock');
        lock.style = '';
      }
      
    }

    lock.addEventListener('touchstart', touchStart, false);
    lock.addEventListener('mousedown', touchStart, false);

    lock.addEventListener('touchmove', touchMove, false);
    lock.addEventListener('mousemove', touchMove, false);

    lock.addEventListener('touchend', touchEnd, false);
    lock.addEventListener('mouseup', touchEnd, false);
  }

  {

  }
  
});