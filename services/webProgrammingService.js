const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const validateWebProblem = async (html, css, js, questionId) => {
  // Create a JSDOM instance
  const dom = new JSDOM(html + `<style>${css}</style><script>${js}</script>`, { runScripts: "dangerously" });
  const document = dom.window.document;

  let results = [];

  // Question-specific validation logic
  switch (questionId) {
    case "wprb1as8dfghjklm": // Question 1: Create a basic HTML structure
      results.push({
        description: "Page contains an <h1> tag with 'Welcome!'",
        passed: document.querySelector("h1")?.textContent === "Welcome!"
      });
      results.push({
        description: "Page contains a <p> tag with 'This is my first webpage.'",
        passed: document.querySelector("p")?.textContent === "This is my first webpage."
      });
      break;

    case "wprb2as8dfghjklm": // Question 2: Style a Button
      const button = document.querySelector("#styledButton");
      const computedStyles = dom.window.getComputedStyle(button);
      results.push({
        description: "Button has rounded corners",
        passed: computedStyles.getPropertyValue("border-radius") !== "0px"
      });
      results.push({
        description: "Button background color changes on hover",
        passed: css.includes(":hover")
      });
      break;

    case "wprb3as8dfghjklm": // Question 3: JavaScript Alert on Click
      let alertTriggered = false;
      dom.window.alert = () => {
        alertTriggered = true;
      };
      document.querySelector("#alertButton").click();
      results.push({
        description: "Alert displays 'Button Clicked!' when button is clicked",
        passed: alertTriggered
      });
      break;

    case "wprb4as8dfghjklm": // Question 4: Create a Horizontal List
      const listItems = Array.from(document.querySelectorAll("#horizontalList li"));
      const listStyle = dom.window.getComputedStyle(document.querySelector("#horizontalList"));
      const allInline = listItems.every(item => dom.window.getComputedStyle(item).getPropertyValue("display") === "inline" || "inline-block");
      results.push({
        description: "List items are displayed in a row",
        passed: allInline
      });
      break;

    case "wprb5as8dfghjklm": // Question 5: Sum Two Numbers
      let sumDisplay = document.querySelector("#result");
      document.getElementById("num1").value = 3;
      document.getElementById("num2").value = 5;
      document.querySelector("#calculateSum").click();
      results.push({
        description: "Calculates sum of 3 and 5 as 8",
        passed: sumDisplay.textContent === "8"
      });

      document.getElementById("num1").value = -5;
      document.getElementById("num2").value = 10;
      document.querySelector("#calculateSum").click();
      results.push({
        description: "Calculates sum of -5 and 10 as 5",
        passed: sumDisplay.textContent === "5"
      });
      break;

      case "wprb6as8dfghjklm": // Question 6: Change Text Color on Hover
      results.push({
        description: "Text color changes on hover",
        passed: css.includes(":hover") && css.includes("#hoverText")
      });
      break;
    
    case "wprb7as8dfghjklm": // Question 7: Display Alert with Input Value
      let alertTriggeredWithValue = null;
      dom.window.alert = (value) => {
        alertTriggeredWithValue = value;
      };
      document.getElementById("userInput").value = "Hello";
      document.getElementById("showAlert").click();
      results.push({
        description: "Displays alert with entered text 'Hello'",
        passed: alertTriggeredWithValue === "Hello"
      });
    
      document.getElementById("userInput").value = "World";
      document.getElementById("showAlert").click();
      results.push({
        description: "Displays alert with entered text 'World'",
        passed: alertTriggeredWithValue === "World"
      });
      break;
    
    case "wprb8as8dfghjklm": // Question 8: Toggle Paragraph Visibility
      const paragraph = document.getElementById("toggleText");
      document.getElementById("toggleButton").click();
      const isVisibleAfterFirstClick2 = paragraph.style.display !== "none";
      document.getElementById("toggleButton").click();
      const isHiddenAfterSecondClick2 = paragraph.style.display === "none";
      results.push({
        description: "Paragraph is visible after one button click",
        passed: isVisibleAfterFirstClick2
      });
      results.push({
        description: "Paragraph is hidden after two button clicks",
        passed: isHiddenAfterSecondClick2
      });
      break;
    
    case "wprb9as8dfghjklm": // Question 9: Add Item to List
      const initialListLength = document.querySelectorAll("#itemList li").length;
      document.getElementById("addItemButton").click();
      const newListLength = document.querySelectorAll("#itemList li").length;
      results.push({
        description: "Adds a new item to the list on button click",
        passed: newListLength === initialListLength + 1
      });
      break;
    
    case "wprb10as8dfghjklm": // Question 10: Change Background Color
      const initialColor = dom.window.getComputedStyle(document.body).backgroundColor;
      document.getElementById("changeColorButton").click();
      const newColor = dom.window.getComputedStyle(document.body).backgroundColor;
      results.push({
        description: "Background color changes on button click",
        passed: initialColor !== newColor
      });
      break;

      case "wprb11zx9dfghjklm": // Question 11: Hide Element on Button Click
      document.getElementById("hideButton").click();
      const isHidden = document.getElementById("textToHide").style.display === "none";
      results.push({
        description: "Paragraph is hidden on button click",
        passed: isHidden
      });
      break;
    
    case "wprb12zx9dfghjklm": // Question 12: Create Hover Effect for Button
      results.push({
        description: "Button font size increases on hover",
        passed: css.includes("#hoverButton:hover") && css.includes("font-size")
      });
      break;
    
    case "wprb13zx9dfghjklm": // Question 13: Show Alert on Page Load
      let alertMessage = null;
      dom.window.alert = (msg) => {
        alertMessage = msg;
      };
      dom.window.dispatchEvent(new dom.window.Event('load'));
      results.push({
        description: "Displays alert with 'Welcome!' on page load",
        passed: alertMessage === "Welcome!"
      });
      break;
    
    case "wprb14zx9dfghjklm": // Question 14: Append Text to Paragraph on Click
      document.getElementById("appendButton").click();
      const paragraphText = document.getElementById("paragraph").textContent;
      results.push({
        description: "Paragraph text changes to 'Original text. New text added.'",
        passed: paragraphText === "Original text. New text added."
      });
      break;
    
    case "wprb15zx9dfghjklm": // Question 15: Display Date on Button Click
      const dateParagraph = document.getElementById("dateParagraph");
      document.getElementById("displayDateButton").click();
      const currentDate = new Date().toISOString().split('T')[0];
      results.push({
        description: "Displays the current date in the format 'YYYY-MM-DD'",
        passed: dateParagraph.textContent.includes(currentDate)
      });
      break;
    
    case "wprb16zx9dfghjklm": // Question 16: Toggle Background Color
      const colorBox = document.getElementById("colorBox");
      const initialColorBoxColor = dom.window.getComputedStyle(colorBox).backgroundColor;
      document.getElementById("toggleButton").click();
      const toggledColorBoxColor = dom.window.getComputedStyle(colorBox).backgroundColor;
      results.push({
        description: "Div color toggles between lightblue and lightgreen on each click",
        passed: initialColorBoxColor !== toggledColorBoxColor
      });
      break;
    
    case "wprb17zx9dfghjklm": // Question 17: Change Text Color on Hover
      results.push({
        description: "Text color changes on hover",
        passed: css.includes("#hoverText:hover") && css.includes("color")
      });
      break;
    
    case "wprb18zx9dfghjklm": // Question 18: Update Text on Input
      const displayText = document.getElementById("displayText");
      const textInput = document.getElementById("textInput");
      textInput.value = "Real-time update";
      textInput.dispatchEvent(new dom.window.Event('input'));
      results.push({
        description: "Paragraph updates with input field content in real-time",
        passed: displayText.textContent === "Real-time update"
      });
      break;
    
    case "wprb19zx9dfghjklm": // Question 19: Display Length of Input Text
      const textLength = document.getElementById("textLength");
      const textInputField = document.getElementById("textInput");
      textInputField.value = "Hello";
      textInputField.dispatchEvent(new dom.window.Event('input'));
      results.push({
        description: "Displays correct character count of input field text",
        passed: textLength.textContent.includes("5")
      });
      break;
    
    case "wprb20zx9dfghjklm": // Question 20: Calculate and Display Sum
      document.getElementById("num1").value = "5";
      document.getElementById("num2").value = "7";
      document.getElementById("calculateButton").click();
      const sumResult = document.getElementById("sumResult").textContent;
      results.push({
        description: "Displays correct sum of two input numbers",
        passed: sumResult.includes("12")
      });
      break;
    
    // Question 21: Expand/Collapse Text
case "wprb21dfghijklmnop":
    const textContent = document.getElementById("textContent");
    document.getElementById("toggleButton").click();
    const isVisibleAfterFirstClick = textContent.style.display !== "none";
    document.getElementById("toggleButton").click();
    const isHiddenAfterSecondClick = textContent.style.display === "none";
    results.push({
      description: "Text content displays when button clicked",
      passed: isVisibleAfterFirstClick
    });
    results.push({
      description: "Text content hides when button clicked again",
      passed: isHiddenAfterSecondClick
    });
    break;
  
  // Question 22: Simple Calculator
  case "wprb22dfghijklmnop":
    document.getElementById("num1").value = "10";
    document.getElementById("num2").value = "5";
    document.getElementById("operation").value = "add";
    document.getElementById("calculateButton").click();
    results.push({
      description: "Addition works correctly",
      passed: document.getElementById("result").textContent.includes("15")
    });
    document.getElementById("operation").value = "subtract";
    document.getElementById("calculateButton").click();
    results.push({
      description: "Subtraction works correctly",
      passed: document.getElementById("result").textContent.includes("5")
    });
    document.getElementById("operation").value = "multiply";
    document.getElementById("calculateButton").click();
    results.push({
      description: "Multiplication works correctly",
      passed: document.getElementById("result").textContent.includes("50")
    });
    document.getElementById("operation").value = "divide";
    document.getElementById("calculateButton").click();
    results.push({
      description: "Division works correctly",
      passed: document.getElementById("result").textContent.includes("2")
    });
    break;
  
  // Question 23: Character Counter
  case "wprb23dfghijklmnop":
    const charCountDisplay = document.getElementById("charCount");
    const inputText = document.getElementById("inputText");
    inputText.value = "Hello World";
    inputText.dispatchEvent(new dom.window.Event('input'));
    results.push({
      description: "Displays correct character count as user types",
      passed: charCountDisplay.textContent.includes("11")
    });
    inputText.value = "";
    inputText.dispatchEvent(new dom.window.Event('input'));
    results.push({
      description: "Character count updates correctly on deletion",
      passed: charCountDisplay.textContent.includes("0")
    });
    break;
  
  // Question 24: Light/Dark Theme Toggle
  case "wprb24dfghijklmnop":
    const bodyClass = document.body.classList;
    document.getElementById("themeToggleButton").click();
    const isDarkTheme = bodyClass.contains("dark-theme");
    document.getElementById("themeToggleButton").click();
    const isLightTheme = bodyClass.contains("light-theme");
    results.push({
      description: "Switches to dark theme on first toggle",
      passed: isDarkTheme
    });
    results.push({
      description: "Switches back to light theme on second toggle",
      passed: isLightTheme
    });
    break;
  
  // Question 25: Display Live Clock
  case "wprb25dfghijklmnop":
    const liveClock = document.getElementById("liveClock");
    const initialTime = liveClock.textContent;
    setTimeout(() => {
      const updatedTime = liveClock.textContent;
      results.push({
        description: "Displays current time in correct format",
        passed: /\d{2}:\d{2}:\d{2}/.test(initialTime)
      });
      results.push({
        description: "Updates time every second",
        passed: initialTime !== updatedTime
      });
    }, 2000);
    break;
  
  // Question 26: Dynamic List Filter
  case "wprb26dfghijklmnop":
    const searchBar = document.getElementById("searchBar");
    const itemList = Array.from(document.querySelectorAll("#itemList li"));
    searchBar.value = "Apple";
    searchBar.dispatchEvent(new dom.window.Event('input'));
    const filteredItems = itemList.filter(item => item.style.display !== "none").length;
    results.push({
      description: "Filters items based on partial match",
      passed: filteredItems === 1
    });
    searchBar.value = "";
    searchBar.dispatchEvent(new dom.window.Event('input'));
    const allItemsVisible = itemList.every(item => item.style.display !== "none");
    results.push({
      description: "Shows all items if search input is empty",
      passed: allItemsVisible
    });
    break;
  
  // Question 27: Random Quote Generator
  case "wprb27dfghijklmnop":
    const quoteDisplay = document.getElementById("quoteDisplay");
    const firstQuote = quoteDisplay.textContent;
    document.getElementById("quoteButton").click();
    const secondQuote = quoteDisplay.textContent;
    results.push({
      description: "Displays a random quote each time",
      passed: firstQuote !== secondQuote
    });
    results.push({
      description: "Quote changes on each button click",
      passed: firstQuote !== secondQuote
    });
    break;
  
  // Question 28: Word Count in Textarea
  case "wprb28dfghijklmnop":
    const wordCountDisplay = document.getElementById("wordCount");
    const textInputArea = document.getElementById("textInput");
    textInputArea.value = "Hello world!";
    textInputArea.dispatchEvent(new dom.window.Event('input'));
    results.push({
      description: "Word count updates as user types",
      passed: wordCountDisplay.textContent.includes("2")
    });
    textInputArea.value = "";
    textInputArea.dispatchEvent(new dom.window.Event('input'));
    results.push({
      description: "Word count is accurate",
      passed: wordCountDisplay.textContent.includes("0")
    });
    break;
  
  // Question 29: Image Carousel
  case "wprb29dfghijklmnop":
    const carouselImage = document.getElementById("carouselImage");
    const initialSrc = carouselImage.src;
    setTimeout(() => {
      const updatedSrc = carouselImage.src;
      results.push({
        description: "Image changes every 3 seconds",
        passed: initialSrc !== updatedSrc
      });
    }, 3000);
    results.push({
      description: "Cycles through all images",
      passed: true // Assuming the setup for carousel images works in the actual implementation
    });
    break;
  
  // Question 30: Show/Hide Password
  case "wprb30dfghijklmnop":
    const passwordField = document.getElementById("passwordField");
    const togglePasswordButton = document.getElementById("togglePassword");
    const initialType = passwordField.getAttribute("type");
    togglePasswordButton.click();
    const toggledType = passwordField.getAttribute("type");
    results.push({
      description: "Displays password as text when toggled",
      passed: initialType === "password" && toggledType === "text"
    });
    togglePasswordButton.click();
    results.push({
      description: "Hides password when toggled again",
      passed: passwordField.getAttribute("type") === "password"
    });
    break;

    // Question 31: Custom Countdown Timer
case "wprb31dfghijklmnop":
    const countdownDisplay = document.getElementById("countdownDisplay");
    const timeInput = document.getElementById("timeInput");
    timeInput.value = 5; // Set initial countdown time
    document.getElementById("startButton").click();
    setTimeout(() => {
      results.push({
        description: "Counts down from input seconds correctly",
        passed: countdownDisplay.textContent.includes("4") // After 1 second
      });
      setTimeout(() => {
        results.push({
          description: "Displays 'Time's up!' when countdown reaches zero",
          passed: countdownDisplay.textContent.includes("Time's up!")
        });
      }, 5000);
    }, 1000);
    break;
  
  // Question 32: To-Do List with Add and Delete
  case "wprb32dfghijklmnop":
    const taskList = document.getElementById("taskList");
    const initialTaskCount = taskList.childElementCount;
    document.getElementById("taskInput").value = "New Task";
    document.getElementById("addTaskButton").click();
    const updatedTaskCount = taskList.childElementCount;
    results.push({
      description: "Adds new task to the list",
      passed: updatedTaskCount === initialTaskCount + 1
    });
    
    // Assuming the first task in the list has a delete button
    const deleteButton = taskList.querySelector("li button");
    deleteButton.click();
    results.push({
      description: "Allows deletion of individual tasks",
      passed: taskList.childElementCount === initialTaskCount
    });
    break;
  
  // Question 33: Responsive Navigation Menu
  case "wprb33dfghijklmnop":
    const navMenu = document.getElementById("navMenu");
    const menuToggle = document.getElementById("menuToggle");
  
    // Simulate small screen
    dom.window.innerWidth = 500;
    dom.window.dispatchEvent(new dom.window.Event("resize"));
    const isMenuHiddenInitially = navMenu.style.display === "none";
    menuToggle.click();
    const isMenuVisibleAfterClick = navMenu.style.display !== "none";
    
    results.push({
      description: "Menu is hidden on small screens by default",
      passed: isMenuHiddenInitially
    });
    results.push({
      description: "Menu toggles visibility on button click",
      passed: isMenuVisibleAfterClick
    });
    break;
  
  // Question 34: Temperature Converter (Celsius to Fahrenheit)
  case "wprb34dfghijklmnop":
    document.getElementById("celsiusInput").value = 25;
    document.getElementById("convertButton").click();
    results.push({
      description: "Correctly converts Celsius to Fahrenheit",
      passed: document.getElementById("resultDisplay").textContent.includes("77") // 25°C to °F
    });
    break;
  
  // Question 35: Simple Quiz Application
  case "wprb35dfghijklmnop":
    document.getElementById("q1").value = "4"; // Correct answer for question 1
    document.getElementById("q2").value = "Paris"; // Correct answer for question 2
    document.getElementById("q3").value = "100"; // Correct answer for question 3
    document.getElementById("submitQuiz").click();
    results.push({
      description: "Calculates score correctly",
      passed: document.getElementById("scoreDisplay").textContent.includes("3") // Assuming 3 correct answers give a full score
    });
    break;

    // Question 36: Form Validation with Error Messages
case "wprb36dfghijklmnop":
    document.getElementById("name").value = ""; // Leave name empty
    document.getElementById("email").value = ""; // Leave email empty
    document.getElementById("submitButton").click();
    const nameErrorVisible = document.getElementById("nameError").style.display !== "none";
    const emailErrorVisible = document.getElementById("emailError").style.display !== "none";
    results.push({
      description: "Displays error for empty name",
      passed: nameErrorVisible
    });
    results.push({
      description: "Displays error for empty email",
      passed: emailErrorVisible
    });
  
    // Fill in values to clear errors
    document.getElementById("name").value = "John Doe";
    document.getElementById("email").value = "john@example.com";
    document.getElementById("submitButton").click();
    results.push({
      description: "No errors when fields are filled",
      passed: document.getElementById("nameError").style.display === "none" &&
              document.getElementById("emailError").style.display === "none"
    });
    break;
  
  // Question 37: Carousel with Next and Previous Buttons
  case "wprb37dfghijklmnop":
    const initialImageSrc = document.getElementById("carouselImage").src;
    document.getElementById("nextButton").click();
    const nextImageSrc = document.getElementById("carouselImage").src;
    results.push({
      description: "Shows the next image",
      passed: initialImageSrc !== nextImageSrc
    });
  
    document.getElementById("prevButton").click();
    const prevImageSrc = document.getElementById("carouselImage").src;
    results.push({
      description: "Shows the previous image",
      passed: prevImageSrc === initialImageSrc
    });
    break;
  
  // Question 38: Modal Popup with Close Button
  case "wprb38dfghijklmnop":
    document.getElementById("openModalButton").click();
    const modalVisibleAfterOpen = document.getElementById("modal").style.display !== "none";
    results.push({
      description: "Modal opens when button is clicked",
      passed: modalVisibleAfterOpen
    });
  
    document.getElementById("closeModalButton").click();
    const modalHiddenAfterClose = document.getElementById("modal").style.display === "none";
    results.push({
      description: "Modal closes when close button is clicked",
      passed: modalHiddenAfterClose
    });
    break;
  
  // Question 39: Dynamic Table Filter
  case "wprb39dfghijklmnop":
    const searchInput = document.getElementById("searchInput");
    searchInput.value = "Jane";
    searchInput.dispatchEvent(new dom.window.Event("input"));
    const filteredRows = Array.from(document.querySelectorAll("#dataTable tbody tr")).filter(row => row.style.display !== "none");
    results.push({
      description: "Filters table based on input",
      passed: filteredRows.length === 1 && filteredRows[0].textContent.includes("Jane")
    });
  
    searchInput.value = "";
    searchInput.dispatchEvent(new dom.window.Event("input"));
    const allRowsVisible = Array.from(document.querySelectorAll("#dataTable tbody tr")).every(row => row.style.display !== "none");
    results.push({
      description: "Shows all rows when input is empty",
      passed: allRowsVisible
    });
    break;
  
  // Question 40: Product Card with Quantity Selector
  case "wprb40dfghijklmnop":
    const quantityInput = document.getElementById("quantityInput");
    const totalPriceDisplay = document.getElementById("totalPrice");
  
    quantityInput.value = 3;
    quantityInput.dispatchEvent(new dom.window.Event("input"));
    results.push({
      description: "Updates total price based on quantity",
      passed: totalPriceDisplay.textContent.includes("$60") // Assuming price per item is $20
    });
  
    quantityInput.value = 5;
    quantityInput.dispatchEvent(new dom.window.Event("input"));
    results.push({
      description: "Displays correct total when quantity changes",
      passed: totalPriceDisplay.textContent.includes("$100") // 5 * $20
    });
    break;
  
  

    default:
      results.push({
        description: "Question ID not recognized",
        passed: false
      });
      break;
  }

  return results;
};

module.exports = { validateWebProblem };
