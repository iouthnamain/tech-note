# Git Examples - Basic Commands
# Git căn bản: Commit, Branch, Merge

## 1. Basic Git Commands

### Initialize Repository
```bash
git init
```

### Check Status
```bash
git status
```

### Add Files
```bash
# Add specific file
git add filename.js

# Add all files
git add .

# Add all files in directory
git add src/
```

### Commit Changes
```bash
# Commit with message
git commit -m "Add user authentication"

# Commit with detailed message
git commit -m "Add user authentication

- Implement login functionality
- Add JWT token generation
- Create user session management"
```

## 2. Branch Management

### Create Branch
```bash
# Create and switch to new branch
git checkout -b feature/user-login

# Or using new syntax
git switch -c feature/user-login
```

### List Branches
```bash
# List local branches
git branch

# List all branches (local and remote)
git branch -a
```

### Switch Branches
```bash
# Switch to existing branch
git checkout main
# Or
git switch main
```

### Delete Branch
```bash
# Delete local branch
git branch -d feature/user-login

# Force delete (if not merged)
git branch -D feature/user-login
```

## 3. Merging Branches

### Merge Branch
```bash
# Switch to target branch
git checkout main

# Merge feature branch
git merge feature/user-login
```

### Resolve Merge Conflicts
```bash
# When conflict occurs, Git marks the conflict
# Edit the conflicted files manually
# Then stage and commit

git add conflicted-file.js
git commit -m "Resolve merge conflict"
```

### Merge Strategies
```bash
# Fast-forward merge (default)
git merge feature-branch

# No fast-forward (creates merge commit)
git merge --no-ff feature-branch

# Squash merge (combines commits)
git merge --squash feature-branch
```

## 4. Remote Repository

### Add Remote
```bash
git remote add origin https://github.com/username/repo.git
```

### Push to Remote
```bash
# Push current branch
git push origin main

# Push all branches
git push --all origin

# Push with upstream tracking
git push -u origin main
```

### Pull from Remote
```bash
# Pull latest changes
git pull origin main

# Fetch without merging
git fetch origin
```

## 5. Common Workflows

### Feature Branch Workflow
```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "Add new feature"

# 3. Push to remote
git push -u origin feature/new-feature

# 4. Switch to main and merge
git checkout main
git pull origin main
git merge feature/new-feature
git push origin main
```

### Git Flow Workflow
```bash
# Main branches: main, develop
# Feature branches: feature/*
# Release branches: release/*
# Hotfix branches: hotfix/*

# Create feature from develop
git checkout develop
git checkout -b feature/user-auth

# Finish feature
git checkout develop
git merge feature/user-auth
```

## 6. Useful Commands

### View History
```bash
# View commit history
git log

# View compact log
git log --oneline

# View graph
git log --graph --oneline --all
```

### Undo Changes
```bash
# Unstage files
git reset HEAD filename.js

# Discard changes in working directory
git checkout -- filename.js

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Stash Changes
```bash
# Save changes temporarily
git stash

# List stashes
git stash list

# Apply stash
git stash apply

# Apply and remove stash
git stash pop
```

## 7. Best Practices

1. **Commit Often** - Small, logical commits
2. **Write Good Commit Messages** - Clear, descriptive
3. **Use Branches** - One feature per branch
4. **Pull Before Push** - Always sync with remote
5. **Review Before Merge** - Check changes before merging
6. **Resolve Conflicts Carefully** - Understand both sides

## 8. Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

Examples:
- `feat(auth): add user login functionality`
- `fix(api): resolve 500 error on user creation`
- `docs(readme): update installation instructions`
- `refactor(utils): simplify validation logic`
