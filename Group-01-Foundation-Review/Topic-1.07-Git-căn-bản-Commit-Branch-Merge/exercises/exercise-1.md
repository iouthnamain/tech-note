# Exercise 1: Git Workflow Practice

## Objective
Practice Git commands and workflows including branching, merging, and conflict resolution.

## Requirements

### Part 1: Initialize Repository

1. Create a new Git repository
2. Create a `README.md` file
3. Add and commit the file
4. Create initial commit message

### Part 2: Branching

1. Create a `develop` branch
2. Create a `feature/add-user` branch from develop
3. Add a `user.js` file in the feature branch
4. Commit the changes
5. Switch between branches and observe differences

### Part 3: Merging

1. Merge `feature/add-user` into `develop`
2. Create another feature branch `feature/add-product`
3. Add a `product.js` file
4. Merge into develop
5. Merge develop into main

### Part 4: Conflict Resolution

1. Create two branches: `feature-a` and `feature-b`
2. Modify the same file in both branches
3. Merge feature-a into main
4. Try to merge feature-b into main (will create conflict)
5. Resolve the conflict manually
6. Complete the merge

### Part 5: Remote Repository (Optional)

1. Create a GitHub repository
2. Add remote origin
3. Push all branches to remote
4. Create a pull request (if using GitHub)

## Starter Commands

```bash
# Initialize repository
git init

# Create README
echo "# My Project" > README.md

# First commit
git add README.md
git commit -m "Initial commit: Add README"

# Create branches
git checkout -b develop
git checkout -b feature/add-user
```

## Expected Git History

After completing, your git log should show:
- Initial commit on main
- Feature branches created from develop
- Merges from feature branches to develop
- Final merge from develop to main

## Testing

Verify your work:
```bash
# View branch structure
git log --graph --oneline --all

# Check current branch
git branch

# View commit history
git log --oneline
```

## Bonus Challenges

1. Use Git Flow workflow
2. Create and merge a hotfix branch
3. Use interactive rebase to clean up commits
4. Create tags for releases
5. Set up Git hooks

## Solution

Check `solutions/solution-1.md` for step-by-step commands after attempting the exercise.

