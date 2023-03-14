# BClub: CS 35L Project
BClub is a new way for Bruins and clubs at UCLA to interact, featuring an interface for club profile pages, event calendars, club interest forms, and powerful searching and filtering tools to find the perfect clubs for you!

# How to build:
- Clone this repository
```
git clone https://github.com/tylerdtran/BClub
```

- Install Node.js 18.14.2 LTS

Arch Linux:
```
pacman -S nodejs npm
```

CentOS, Fedora and Red Hat Enterprise Linux:
```
dnf module install nodejs:18/common
```

Debian based Linux distributions:
```
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - &&\
apt-get install -y nodejs
```

Gentoo:
```
emerge nodejs
```

macOS:
macOS installer from https://nodejs.org/en/#home-downloadhead
or
```
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

Windows:
Windows installer from https://nodejs.org/en/#home-downloadhead
or 
```
winget install OpenJS.NodeJS
```
Ubuntu based Linux distributions:
```
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

# Install dependencies:
```
cd BClub
cd frontend
npm install react-router-dom
npm install firebase
npm install moment
npm install react-google-button 
npm install react-bootstrap bootstrap
npm install --save react-firebase-hooks
npm install @mui/icons-material/ThumbDown @mui/icons-material/ThumbUp @mui/material/Rating

```

# Move to the project directory:
```
cd BClub
cd frontend
npm install
npm run build
```

# Database:

Insert database instructions here

# Run:

Start the client with:
```
cd frontend
npm start
```
