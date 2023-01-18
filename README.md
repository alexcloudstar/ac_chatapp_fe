<div align="center">
<img src="https://www.alexcloudstar.com/_next/image?url=https://media.graphassets.com/q3eD0G45S8G5dksnIkPm&w=640&q=75" />
</div>

<h1>Chat App V2</h1>
is the upgraded application of KSChat (app which is just available though repo and no preview https://github.com/alexcloudstar/ac-chat-app

**On this app you can do the following:**

  

<h2>User features:</h2>

-   Create an account
-   Log In / Log out
-   View your profile
-   **You can see user other users profile. And the users will have a badge which indicates if user is admin/user**
-   Customise your profile with the following: name, username, profile picture (which is need to be an URL to a photo), email, password.
-   You can be admin/user.
-   As user you can create new chat rooms with the following customisations: room name, profanity words (these words if they are entered will be replaced by Asterix. Example: If we have profanity words set to: drug, drugs. When a user is typing drug or drugs will be replaced by ****.) you can select users which they are invited into the room, and room avatar (which as the same on user needs to be a link to an image). On the BE there are more routes for example leave a chat room but they are not implemented into the UI due to this is a portfolio item and it has no use at this very moment for production even if it can be used for.
-   You can see users status such as online/offline. As presented into photo under the photo it will be green circle which indicates the user is online or gray if the user is offline. These statuses changed on log in / log out or focus/unfocuse the tab with the app
-   On the chat list, you can see the image of room, title,  who was creating the room. And under that on the left side you can see the last message. And on the right side is the hour when the message has been sent.
-   When you create a new room a default message will be assigned as first message: Welcome to the chatroom! ⚡️
-   Into the chat you can edit the room with the things above I presented on creating a room.
-   You can send messages either press enter or on press send button in **real time**.
-   You can select emoji from emoji picker
-   You can search for rooms.
-   When user have any punishment it will not be able to access the chatroom until the punishment is expired.

<h2>Admin features:</h2>

-   All users features
-   Can give ban/mute for a period of time. 5, 10, 15, 30, 60, 120 minutes. Or 24 hours. Or permanent.

  

<h3>BE Technologies:</h3>

-   NestJS
-   PrismaJS
-   Passport
-   JWT
-   Socket.io
-   Docker
-   PostgreSQL
-   Prettier
-   ESLint

  

<h3>FE Technologies:</h3>

- ReactJS
- Redux
- Typescript
- React Select
- React Router DOM
- React Redux
- React Hook Form
- Emoji Picker React
- Swiper
- Socket.io
- Tailwind
- Chromatic
- Storybook
- ESLint
- StyleLint
- PostCSS
- Husky
- Prettier
- Vite
- React Icons

<h3>Deployment: </h3>

Frontend is hosted on **[vercel.com](http://vercel.com)**

Backend is hosted on **[aws.com](http://aws.com)**
