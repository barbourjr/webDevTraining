export class ToggleDarkMode {
    toggleDarkMode(modeBox) {
      if (modeBox.checked === true) {
          document.documentElement.classList.remove("light")
          document.documentElement.classList.add("dark")
          window.localStorage.setItem('mode', 'dark');
        } else {
          document.documentElement.classList.remove("dark")
          document.documentElement.classList.add("light")
          window.localStorage.setItem('mode', 'light');
        }
      
        const mode = window.localStorage.getItem('mode');
        if (mode && mode == 'dark') {
          modeBox.checked = true;
          document.documentElement.classList.remove("light")
          document.documentElement.classList.add("dark")
        }
      
        if (mode && mode == 'light') {
          modeBox.checked = false;
          document.documentElement.classList.remove("dark")
          document.documentElement.classList.add("light")
      }
    }
  }
  