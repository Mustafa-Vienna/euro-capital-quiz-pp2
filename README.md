# European Union Flag Quiz

---

The Flag Quiz is a JavaScript application that allows users to test their knowledge of country flags. Users are presented with a flag and must select the correct country from multiple choices. The application tracks correct and incorrect answers and provides feedback on user performance.

[Live project here](https://mustafa-vienna.github.io/euro-capital-quiz-pp2/)

![Mockup of Flag Quiz](assets/images/readme/review.webp)

## Contents

1. [Flag Quiz Website](#flag-quiz-website)
   - [User Story](#user-story)
   - [Acceptance Criteria](#acceptance-criteria)
2. [Features](#features)
   - [General Features on Each Page](#general-features-on-each-page)
   - [Future Implementations](#future-implementations)
   - [Accessibility](#accessibility)
3. [Usage](#usage)
4. [Design](#design)
   - [Color Scheme](#color-scheme)
   - [Typography](#typography)
   - [Wireframes](#wireframes)

## User Story

As a geography enthusiast, I want to test my knowledge of country flags by taking a quiz, so that I can improve my recognition skills and learn more about different countries.

### Acceptance Criteria

- As a user, I can see a flag and multiple choice options to select the correct country.
- I should be able to see my score and track my progress throughout the quiz.
- It's essential for me to have a timer for each question to make the quiz more challenging.
- The application should be responsive and work well on different devices.
- I expect the application to provide feedback on my performance after the quiz.

[Go to Contents](#contents)

## Features

### General Features on Each Page

- **Demo Data**: The application provides demo data for the first load for testing purposes.

- **Quiz Functionality**: Users are presented with a flag and must choose the correct country from four options.

  ![Quiz question](assets/images/readme/quiz_game.webp)

- **Score Tracking**: Tracks the number of correct and incorrect answers.

- **Failed**: If the user scores less than 4 correct answers.
  ![Score tracking](assets/images/readme/failed_score.webp)

- **Pass**: If the user scores between 4 and 7 correct answers.
  ![Score tracking](assets/images/readme/pass_score.webp)

- **Excellent**: If the user scores more than 7 correct answers.
  ![Score tracking](assets/images/readme/top_score.webp)

- **Timer**: Each question has a countdown timer to add urgency to the quiz. Each question must be answered within a 5-second time frame. If the player does not select any option within this time frame, they will lose one score.

  ![Timer](assets/images/readme/timer.webp)

- **Responsive Design**: The application is optimized for various screen sizes and devices.

### Future Implementations

I plan to enhance the Flag Quiz website with additional features such as more questions, difficulty levels, and leaderboards to make the quiz more engaging and competitive.

### Accessibility

The Flag Quiz website is designed with accessibility in mind to ensure all users can navigate and enjoy the content. Key accessibility features include:

- **Responsive Design**: The site is fully responsive, adapting to different screen sizes and devices to provide a seamless experience for all users.
- **Alt Text for Images**: All images on the site include descriptive alt text to aid users with screen readers.
- **Keyboard Navigation**: The site supports full keyboard navigation to assist users who cannot use a mouse.
- **Contrast and Readability**: High contrast colors and readable fonts are used throughout the site to ensure text is easy to read.
- **Semantic HTML**: The site uses semantic HTML elements to improve accessibility and SEO.

[Go to Contents](#contents)

## Usage

1. Start the quiz by clicking the "Start" button.
2. View the flag displayed and choose the correct country from the multiple choice options.
3. The application will automatically move to the next question if the player did not select any answer and the timer runs out.
4. If the player selects an answer, they can click on the next button.
5. The next button is only clickable if the player made a choice.
6. After completing 10 questions, the quiz will end, and you will see your final score.
7. To restart the quiz, click the "Replay Quiz" button.
8. To quit/exit the quiz, click the "Quit Quiz" button.

[Go to Contents](#contents)

## Design

### Color Scheme

The color scheme for the Flag Quiz website was chosen to create a vibrant and engaging atmosphere that appeals to users of all ages. A smoke-white color was used for the background to enhance visibility and provide a comfortable viewing experience.

![Colors used in Flag Quiz](assets/images/readme/color_used.webp)

### Typography

The Flag Quiz website uses a combination of fonts to create a visually appealing and cohesive design. These fonts were chosen for their readability, versatility, and aesthetic appeal.

- **Roboto**: Imported from Google Fonts, used for both regular and bold text, in both normal and italic styles. Used for headings to add a playful and bold touch. Used for body text to ensure readability.

```
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap');
```

- **Open Sans**: Used specifically for the rules in the .info-lis class to enhance readability and provide a clear presentation of information.

[Go to Contents](#contents)
