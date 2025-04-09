#!/bin/bash

echo "Setting up Git repository and pushing to GitHub..."

# Initialize Git repository if not already initialized
if [ ! -d .git ]; then
  git init
  echo "Git repository initialized."
else
  echo "Git repository already exists."
fi

# Create .gitignore file if it doesn't exist
if [ ! -f .gitignore ]; then
  echo "Creating .gitignore file..."
  cat > .gitignore << EOL
# Dependencies
node_modules/
/client/node_modules/
/server/node_modules/

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build files
/client/build/
/dist/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE files
.idea/
.vscode/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
EOL
  echo ".gitignore file created."
else
  echo ".gitignore file already exists."
fi

echo "Adding files to Git (excluding files specified in .gitignore)..."
# Add all files to git (excluding files specified in .gitignore)
git add .

# Create initial commit
git commit -m "Initial commit of Covette project"

# Add GitHub remote (replace if it already exists)
git remote remove origin 2>/dev/null
git remote add origin https://github.com/sumant2000/CuvetteTech.git
echo "Remote repository set to: https://github.com/sumant2000/CuvetteTech.git"

# Push to GitHub
echo "Pushing code to GitHub..."
git push -u origin main || git push -u origin master

echo "Done! Your code has been pushed to GitHub."
