# CSES-ASTU Portal -  Development devision 2025 final project

# Dev tools

IDE: VsCode (Recommended Cursor)

### VS code Extensions (Mandatory)

- prettier
- eslint
- tailwind css intellisense

<br>

## Tech Stack

### Package Manager

- npm

### Tech

- NextJs
- Tailwind
- Shadcn
- Prettier

### Icons

- Lucid [Icons](https://lucide.dev/icons/)

### Project management

- ClickUp

<br>

# How to run the project locally

- `npm install` to install dependencies
- `npm run dev` to start running the project

# How to collaborate 
- Clone the project
- Create your own branch
- Update the code and commit your changes
- Create a pull request

# Branch naming 
- Currently we have 3 ways of updating code
  1. Adding a feature (feat)
  2. Fixing an issue (fix)
- creat your branch as the following
  1. `your-name/feat/a-short-description` - For adding a new page/feature
  2. `your-name/fix/a-short-description`  - For fxing an issue

<br>

# Must to know and keep in mind while working on this project

## General

1. **Make your code as simple as possible to understand.**

   Complex solutions might seem clever, but they're harder to maintain. Choose clarity over complexity.
   Ask yourself a question: If someone (or even I) came to this code after six months to add something, would they be able to understand it easily?

   ```javascript
   // Bad: Overly complex
   const isEven = (num) => !Boolean(num & 1);

   // Good: Simple and clear
   const isEven = (num) => num % 2 === 0;
   ```

2. **Don't add comment for self explanatory things. Trying to make clear thing more clear will make it complicated.**

   Let your code speak for itself when possible.

   ```javascript
   // Bad: Unnecessary comments
   // This function adds two numbers
   const add = (a, b) => {
     return a + b; // Return the sum
   };

   // Good: Self-explanatory code needs no comments
   const add = (a, b) => a + b;
   ```

3. **Comment when you can't make your code readable.**

   Some complex algorithms or business logic may need explanation.

   ```javascript
   // Good: Comment explains complex business logic
   // Apply 15% discount if order is above $100 and customer is premium
   // or if it's a holiday promotion period
   const calculateDiscount = (
     orderTotal,
     isPremiumCustomer,
     isHolidayPromo
   ) => {
     if ((orderTotal > 100 && isPremiumCustomer) || isHolidayPromo) {
       return orderTotal * 0.15;
     }
     return 0;
   };
   ```

4. **Always keep in mind that end user using our product, made by your code.**

   Write code with the user experience in mind.

   ```javascript
   // Bad: Focusing only on technical implementation
   const submitForm = () => {
     try {
       sendDataToServer();
     } catch (error) {
       console.error(error);
     }
   };

   // Good: Considering user experience
   const submitForm = async () => {
     setLoading(true);
     try {
       await sendDataToServer();
       showSuccessMessage('Your form has been submitted successfully!');
     } catch (error) {
       showErrorMessage("We couldn't submit your form. Please try again.");
       logErrorToMonitoring(error);
     } finally {
       setLoading(false);
     }
   };
   ```

5. **Consistency is key.**

   `Code should look like it was written by a single individual!`
   `Consistently bad is better than inconsistently good!`

   Imagine a system initially developed with Technique A. A new software developer joins, and starts using technique B, which is objectively better than Technique A. Years later, that software developer is replaced by another developer, who uses Technique C, an arguably better technique than either Technique A or Technique B. Let this repeat. What you end up with is a software system with X number of ways of doing the same thing. You use up precious brain-space to accommodate the X different methods of doing things, and you can never really be sure which way you'll be encountering in your codebase.

   ```javascript
   // Bad: Inconsistent naming conventions
   const GetUserData = () => {
     /* ... */
   };
   const save_post = () => {
     /* ... */
   };
   const deleteComment = () => {
     /* ... */
   };

   // Good: Consistent camelCase for functions
   const getUserData = () => {
     /* ... */
   };
   const savePost = () => {
     /* ... */
   };
   const deleteComment = () => {
     /* ... */
   };
   ```

6. **Single responsibility principle.**

   `Each function or component should do one thing well.`

   As the name suggests, this principle states that each class should have one responsibility, one single purpose. This means that a class will do only one job, which leads us to conclude it should have only one reason to change.

   We don't want objects that know too much and have unrelated behavior. These classes are harder to maintain. For example, if we have a class that we change a lot, and for different reasons, then this class should be broken down into more classes, each handling a single concern. Surely, if an error occurs, it will be easier to find.

7. **Research existing solutions before reinventing the wheel.**

   Leverage existing libraries and tools when appropriate.

   ```javascript
   // Bad: Implementing your own date formatting
   const formatDate = (date) => {
     const day = date.getDate().toString().padStart(2, '0');
     const month = (date.getMonth() + 1).toString().padStart(2, '0');
     const year = date.getFullYear();
     return `${day}/${month}/${year}`;
   };

   // Good: Using existing libraries
   import { format } from 'date-fns';

   const formatDate = (date) => format(date, 'dd/MM/yyyy');
   ```

8. **Try to solve problems independently before asking.**

   Don't rush to ask the dev team before attempting to find a solution yourself.

   ```javascript
   // When facing an issue:

   // Step 1: Check documentation
   // Step 2: Search online (Stack Overflow, GitHub issues)
   // Step 3: Try debugging with console.log or debugger
   // Step 4: If still stuck after genuine effort, ask with context:

   // "I'm trying to implement feature X using library Y.
   // I've tried approaches A and B (code below), but I'm getting error Z.
   // Here's what I've researched so far..."
   ```

9. **Be reasonable to all of your code (at least you should know how your code is working).**

   Understand your code thoroughly, including edge cases.

   ```javascript
   // Bad: Using code you don't fully understand
   const sortItems = (items) => {
     // Complex code copied from ChatGPT or StackOverflow, not sure why it works
   };

   // Good: Understanding what your code does
   const sortItems = (items) => {
     // Using proper sorting approach that matches our use case.
   };
   ```

10. **Don't try optimizing too soon.**

Premature optimization is spending a lot of time on something that you may not actually need.

11. **Follow rules and convention.**

    Adhere to the project's established patterns and guidelines.

    ```javascript
    // Bad: Ignoring project conventions
    // If project uses async/await pattern
    const fetchData = () => {
      return fetch('/api/data')
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    };

    // Good: Following project conventions
    // Using async/await as per project standards
    const fetchData = async () => {
      const response = await fetch('/api/data');
      return await response.json();
    };
    ```

12. **You are here to solve a problem.**

    Remember that code is a means to an end, not the end itself. Focus on delivering value and solving real problems.

    - Always ask "What problem am I trying to solve?" before writing code
    - Consider if your solution is the simplest way to address the problem
    - Prioritize user needs over technical elegance
    - Be willing to refactor or even discard code that doesn't effectively solve the problem
    - Measure success by outcomes (problems solved) rather than outputs (lines of code written)

<br>

# Must to know and keep in mind while working on this project

## Technical and Conventions

1. **Use Server Components by default, Client Components when necessary**

   Next.js 13+ uses React Server Components by default, which offer better performance and SEO benefits.

   ```jsx
   // BAD: Making an entire page a client component
   'use client';

   export default function ProductPage() {
     // The entire page is now client-rendered, even static parts
     return (
       <div>
         <Header />
         <ProductDetails />
         <Reviews />
         <RelatedProducts />
         <Footer />
       </div>
     );
   }

   // GOOD: Keep the page as a server component and isolate client components
   // product/page.tsx (Server Component by default)
   import InteractiveReviews from '@/components/InteractiveReviews';

   export default function ProductPage() {
     return (
       <div>
         <Header />
         <ProductDetails />
         <InteractiveReviews /> {/* Only this part is client-rendered */}
         <RelatedProducts />
         <Footer />
       </div>
     );
   }
   ```

   **Important rules:**

   - **NEVER make a root page component a client component** - this forces the entire page to be client-rendered
   - Only make the specific parts that need client interactivity into client components
   - Create smaller, focused client components and import them into server components
   - Keep data fetching in server components whenever possible
   - Remember that client components increase bundle size and affect performance

3. **Be cautious when adding new libraries**

   Every library added increases bundle size and maintenance burden.

   **Important rules:**

   - Before adding a new library:
     1. Check if the functionality exists in our current dependencies
     2. Consider if native browser/Node APIs could solve the problem
     3. Evaluate bundle size impact (use tools like Bundlephobia)
     4. Check maintenance status (GitHub stars, last commit, open issues)
   - Get team approval for adding new dependencies - MUST
   - Document why the library was added in the PR - MUST

5. **Use Lucide React icons by default**

   Prefer using Lucide React icons over custom SVGs for consistency and performance.

   ```jsx
   // BAD: Importing custom SVG when similar icon exists
   import { UserIcon } from '../assets/user-icon.svg';

   const UserProfile = () => {
     return (
       <div>
         <UserIcon className="w-6 h-6" />
         <span>Profile</span>
       </div>
     );
   };

   // GOOD: Using Lucide React icon
   import { User } from 'lucide-react';

   const UserProfile = () => {
     return (
       <div>
         <User className="w-6 h-6" />
         <span>Profile</span>
       </div>
     );
   };
   ```

   **Important rules:**

   - Check Lucide React first before using custom SVGs
   - It's acceptable to use a similar icon if the exact one isn't available
   - If a custom SVG is necessary, optimize it with SVGO before importing
   - Keep custom SVGs in a dedicated `public/assets/icons` directory

6. **Follow naming conventions consistently**

   Use consistent naming patterns for files, components, and variables.

   ```jsx
   // File naming conventions:
   // pages/UserProfile/page.tsx (Page component)
   // components/UserAvatar/index.tsx (Component)
   // hooks/useUserData.ts (Hook)
   // utils/formatDate.ts (Utility function)

   // Component naming:
   const UserProfile = () => {
     /* ... */
   }; // PascalCase for components

   // Variable naming:
   const userName = 'John'; // camelCase for variables
   const fetchUserData = async () => {
     /* ... */
   }; // camelCase for functions
   const MAX_RETRY_COUNT = 3; // UPPER_SNAKE_CASE for true constants
   ```

   **Important rules:**

   - Add 'Page' suffix to all root page components: `UserProfilePage`
   - Use PascalCase for component names and files containing components
   - Use camelCase for variables, functions, and instances
   - Use UPPER_SNAKE_CASE for true constants (values that never change, like API endpoints, configuration values, or mathematical constants)

     ```javascript
     // True constants (use UPPER_SNAKE_CASE)
     const API_BASE_URL = 'https://api.example.com';
     const MAX_RETRY_ATTEMPTS = 3;
     const PI = 3.14159;

     // Not true constants (use camelCase)
     const [isLoading, setIsLoading] = useState(false); // State can change
     const userConfig = { theme: 'dark' }; // Object that might be modified
     const apiResponse = await fetchData(); // Result of a function call
     ```

   - Keep file and directory names descriptive but concise
   - Be consistent with plural vs. singular naming (e.g., `components/Button` vs. `pages/Users`)

7. **Define component props inside the component file**

   Keep prop definitions close to the components that use them for better maintainability.

   ```tsx
   // BAD: Defining props in a separate file
   // types/user-card-props.ts
   export interface UserCardProps {
     user: {
       id: string;
       name: string;
       role: 'admin' | 'user' | 'guest';
       avatarUrl?: string;
     };
     isSelected?: boolean;
     onSelect: (userId: string) => void;
   }

   // components/UserCard.tsx
   import { UserCardProps } from '../types/user-card-props';

   const UserCard = ({ user, isSelected, onSelect }: UserCardProps) => {
     // ...
   };

   // GOOD: Defining props in the same file as the component
   // components/UserCard.tsx
   interface UserCardProps {
     user: {
       id: string;
       name: string;
       role: 'admin' | 'user' | 'guest';
       avatarUrl?: string;
     };
     isSelected?: boolean;
     onSelect: (userId: string) => void;
   }

   const UserCard = ({ user, isSelected = false, onSelect }: UserCardProps) => {
     // ...
   };
   ```

   **Important rules:**

   - Use TypeScript `interface` for props typing, not `type`
   - Define the interface directly in the component file
   - Name the interface as `ComponentNameProps` (e.g., `UserCardProps`)
   - Export the interface only if it's needed by other components
   - Be explicit with prop types (avoid `any` or overly generic types)
   - Provide default values for optional props when appropriate

8. **Organize page-specific components in their page directory**

   Keep components that are only used by a specific page close to that page.

   ```
   // GOOD: Page-specific component organization
   app/
   ├── signup/
   │   ├── _components/
   │   │   ├── SignUpForm.tsx
   │   │   ├── TermsAndConditions.tsx
   │   │   └── PasswordStrengthIndicator.tsx
   │   └── page.tsx
   ├── dashboard/
   │   ├── _components/
   │   │   ├── ActivityFeed.tsx
   │   │   ├── QuickStats.tsx
   │   │   └── RecentTransactions.tsx
   │   └── page.tsx
   └── components/  (shared components used across multiple pages)
       ├── Button.tsx
       ├── Card.tsx
       └── Input.tsx
   ```

   **Important rules:**

   - Use a `_components` folder within each page directory for page-specific components
   - Only place components in the global `/components` directory if they're used across multiple pages
   - Name page-specific components with context in mind (e.g., `SignUpForm` instead of just `Form`)
   - Import page components using relative paths: `import { SignUpForm } from './_components/SignUpForm'`
   - Keep the component hierarchy flat when possible within the page's component directory
   - Consider creating subdirectories within `_components` only for complex pages with many components

9. **Sort imports consistently**

   Please, organize imports in a consistent order to improve readability and maintainability.

   ```tsx
   // BAD: Unorganized imports
   import { useState } from 'react';
   import styles from './UserProfile.module.css';
   import { User } from 'lucide-react';
   import { formatDate } from '@/utils/date';
   import { Button } from '@/components/ui/button';
   import axios from 'axios';
   import { UserAvatar } from '@/components/UserAvatar';

   // GOOD: Properly sorted imports
   // 1. Built-in React imports
   import { useState, useEffect } from 'react';

   // 2. External libraries/dependencies
   import axios from 'axios';
   import { User } from 'lucide-react';

   // 3. Internal components, hooks, and utilities
   import { Button } from '@/components/ui/button';
   import { UserAvatar } from '@/components/UserAvatar';
   import { formatDate } from '@/utils/date';

   // 4. Styles and assets
   import styles from './UserProfile.module.css';
   ```

   **Important rules:**

   - Group imports in the following order with a blank line between each group:
     1. Built-in React/Next.js imports
     2. External third-party libraries
     3. Internal project imports (components, hooks, utils)
     4. Styles, types, and assets
   - Within each group, try to maintain alphabetical order
   - Use absolute imports with `@/` prefix for project files when possible
   - Keep destructured imports organized (e.g., `import { a, b, c } from 'module'`)

10. **Use the `cn` utility for class merging**

    Combine Tailwind classes conditionally using the `cn` utility instead of string templates.

    ```tsx
    // BAD: Using string concatenation or template literals
    const Button = ({ variant, disabled }) => {
      return (
        <button
          className={`px-4 py-2 rounded-md ${variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Click me
        </button>
      );
    };

    // GOOD: Using the cn utility
    import { cn } from '@/lib/utils';

    const Button = ({ variant, disabled }) => {
      return (
        <button
          className={cn(
            'px-4 py-2 rounded-md',
            variant === 'primary'
              ? 'bg-primary-foreground'
              : 'bg-background-secondary',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          Click me
        </button>
      );
    };
    ```

    **Important rules:**

    - Always use the `cn` utility from `@/lib/utils` for conditional class merging
    - The `cn` function combines `clsx` and `tailwind-merge` to handle class conflicts properly
    - Avoid string concatenation or template literals for class names
    - Structure complex class combinations with proper indentation for readability
    - Remember that `cn` will intelligently merge conflicting Tailwind classes (the last one wins)


