# StorePulse UI Walkthrough

This walkthrough follows the real user journey through StorePulse: authentication, administration, store ratings, and owner feedback insights.

## 1. Sign in

All roles use one sign-in page. After successful authentication, the application reads the user role from the session token and opens the appropriate workspace.

<img width="1366" height="692" alt="StorePulse sign-in page" src="https://github.com/user-attachments/assets/b1c44a49-11f5-460c-9101-c10627452069" />

## 2. Member registration

New visitors can create a Member account with a full name, email, address, and password. The form provides clear validation feedback for the required full-name, email, address, and password rules. Public registration creates only Member accounts; Administrator and Store Owner accounts are provisioned by an Administrator.

<img width="1366" height="768" alt="StorePulse member registration page" src="https://github.com/user-attachments/assets/5c83c5bb-b116-4b91-973e-835383fcd85f" />

## 3. Administrator workspace

Administrators manage the platform through a dedicated workspace.

### Overview

The overview presents the total number of users, stores, and submitted ratings, along with a short explanation of the sentiment insight flow.

<img width="1366" height="691" alt="Administrator overview dashboard" src="https://github.com/user-attachments/assets/11bc1569-c333-4681-bcf5-37a9cec33861" />

### People management

The People page lists registered accounts with their name, email, address, and role. Administrators can search accounts and create Member or Administrator accounts when needed.

<img width="1366" height="689" alt="Administrator people management page" src="https://github.com/user-attachments/assets/4111e800-4143-40ad-b8af-31367500707c" />

<img width="1362" height="678" alt="Administrator create account form" src="https://github.com/user-attachments/assets/bfd6d0b3-f193-4c94-b10e-04dd6cf829f5" />

### Store and ownership management

The Stores page shows each store with its address, overall rating, and assigned owner. Creating a store also creates its Store Owner account and links both records in the same backend transaction.

<img width="1366" height="687" alt="Administrator store management page" src="https://github.com/user-attachments/assets/82b7275e-0973-46bd-b872-bcced85d2048" />

<img width="1362" height="698" alt="Create store and assign Store Owner form" src="https://github.com/user-attachments/assets/22b4-4ed2-947a-83f61d9f01af" />

## 4. Member experience

Members can browse registered stores, search by store name, and see each store's overall rating alongside their own submitted rating.

<img width="1366" height="693" alt="Member workspace" src="https://github.com/user-attachments/assets/8d15b994-63f4-488b-ac13-b19f5846e707" />

<img width="1365" height="653" alt="Member store list and search" src="https://github.com/user-attachments/assets/49d2b9a1-e81b-479b-a8cc-e10f0554176e" />

Members submit a rating from 1 to 5 stars and can include an optional written comment. Resubmitting for the same store updates their existing rating instead of creating a duplicate.

<img width="1366" height="691" alt="Member rating and review form" src="https://github.com/user-attachments/assets/9ab16d1e-b74d-4a6f-990a-7039ec01dbf6" />

## 5. Store Owner insights

Store Owners see feedback only for their assigned store. The dashboard shows the average rating, total responses, written comments, and a clear sentiment label for each review: Happy, Neutral, Unhappy, or No comment.

<img width="1366" height="768" alt="Store Owner sign-in flow" src="https://github.com/user-attachments/assets/e1a3fa0b-0f83-4382-9296-207ce7a31be6" />

<img width="1366" height="688" alt="Store Owner sentiment dashboard" src="https://github.com/user-attachments/assets/d0a314d3-bbbe-448c-986a-70c981f42948" />

## Summary

StorePulse provides an end-to-end rating workflow with clear separation of responsibilities. Administrators manage users, stores, and ownership; Members discover and rate stores; and Store Owners turn submitted feedback into practical sentiment insights. The React interface connects to an Express API, with Prisma managing data in Neon PostgreSQL and the sentiment service classifying written reviews.
