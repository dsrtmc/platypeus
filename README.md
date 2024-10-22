![platypeus is goat](https://github.com/user-attachments/assets/74a2442d-5bc9-4f9a-ae7a-1d8f62f24197)

<br />

# About

Platypeus is a website where you can measure your typing speed. It offers a basic account and a scoreboard system, as well as some multiplayer racing capabilities. The default test uses the 200 most common English words as the wordlist.

This project is largely inspired by [Monkeytype](https://monkeytype.com), which we believe to be an incredible creation that tens of thousands of users use daily, not without reason. The racing system was loosely modeled after [TypeRacer](https://play.typeracer.com), which has been the leading typing-test racing platform for more than 15 years now.

The main motivation behind Platypeus was a combination of a desire to understand how two great services we personally use are created, as well as a few minor subjective imperfections both platforms 'suffered' from. Platypeus is selfishly tweaked so that it would please the developer who made it, enabling them to boot up the application without wishing, 'Oh, I wish this feature were different'.

# Features

- minimalistic design
- live errors, wpm, and accuracy displays
- a (soon-to-be big) collection of languages
- customizable appearance
- personal over-time progress tracking via graphs
- account, leaderboard, multiplayer racing system

# Technology

- Frontend
  - **Next.js** - used in conjunction with TypeScript providing a well-documented, type-safe, smooth developer experience.
- Backend
  - **ASP.NET Core** - chosen to build the web API due to its structured, opinionated framework thus emphasizing good practices and code reusability.
  - **GraphQL** - integrated into the ASP.NET Core app via [HotChocolate](https://github.com/ChilliCream/graphql-platform), allowing much stricter control over the data flow.
  - **PostgreSQL** - serves as the main database for the application.
  - **Redis** - (as of right now) only serves as the GraphQL subscription provider, enabling running multiple instances of the GraphQL sever and handling subscription events reliably.
- Deployment
  - **Docker** - the application is containarized with Docker, then deployed to a VPS running Ubuntu and internally handled using Dokku.
  - **Dokku** - being an extensive, open-source, lightweight PaaS, facilitates swift and trouble-free deployment and integration of various services, such as an NGINX proxy or different databases.

# Bug reports

We are aware of certain bugs that are yet to be fixed, however if you feel like you encounter a bug we might not know about, you can simply let the developer know privately if you know them. Otherwise, you're invited to create a [GitHub issue](https://github.com/dsrtmc/platypeus/issues).

# Credits

[Monkeytype](https://monkeytype.com) - by far the most advanced, supported, and arguably the most aesthetically pleasing typing test on the Internet, was the main inspiration behind Platypeus.

[TypeRacer](https://play.typeracer.com) - for being the go-to typing-test racing application since the dawn of time, largely impacting the decision to create this rendition of Platypeus.

