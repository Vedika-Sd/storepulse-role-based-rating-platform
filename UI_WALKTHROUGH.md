# StorePulse - Role Based Rating Platform 
A full-stack store rating platform with role-based access for administrators, members, and store owners, built with React, Express, Prisma, and Neon PostgreSQL, including customer review sentiment insights.

1. Login page
    <img width="1366" height="692" alt="image" src="https://github.com/user-attachments/assets/b1c44a49-11f5-460c-9101-c10627452069" />
first login page where user can login with their mail id and password, which is trived from real databse from neon postgresql

2. Signup page
  <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/5c83c5bb-b116-4b91-973e-835383fcd85f" />
  if account not alredy exist create one with fields having full name, email, address, password. Validators implemented and show warnig if username not have 20 char or email is invalid, clear m
message shown instead of just error
By defult everytime created account considered as a member it can be contolled and change by only admin login

3. Admin page
   4a - admin overview page
   <img width="1366" height="691" alt="image" src="https://github.com/user-attachments/assets/11bc1569-c333-4681-bcf5-37a9cec33861" />
   here admin can see how many members registed on portal, store number and overall rating.

   4b - admin people page
   <img width="1366" height="689" alt="image" src="https://github.com/user-attachments/assets/4111e800-4143-40ad-b8af-31367500707c" />
   here admin can see all data about all registred emails, role
   Admin has option to add account option, only admin can make some one admin otherxise all are by defult member

   4b - admin had add account page
   <img width="1362" height="678" alt="image" src="https://github.com/user-attachments/assets/bfd6d0b3-f193-4c94-b10e-04dd6cf829f5" />
   here admin can create member with thier info and assign roles

  4c - admin store page
  <img width="1366" height="687" alt="image" src="https://github.com/user-attachments/assets/82b7275e-0973-46bd-b872-bcced85d2048" />
  here admin can see existed stores and overall thier rating

  4c - admin can add new stores and thir owners
  <img width="1362" height="698" alt="image" src="https://github.com/user-attachments/assets/22f77218-22b4-4ed2-947a-83f61d9f01af" />

5. Member USer login
   <img width="1366" height="693" alt="image" src="https://github.com/user-attachments/assets/8d15b994-63f4-488b-ac13-b19f5846e707" />

   5a - store list to give rating can search also
   <img width="1365" height="653" alt="image" src="https://github.com/user-attachments/assets/49d2b9a1-e81b-479b-a8cc-e10f0554176e" />

  5b - give store rating 1-5 star and also add comment
<img width="1366" height="691" alt="image" src="https://github.com/user-attachments/assets/9ab16d1e-b74d-4a6f-990a-7039ec01dbf6" />

6. Store Owner login
   <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/e1a3fa0b-0f83-4382-9296-207ce7a31be6" />

   6a - owner dashboard
   <img width="1366" height="688" alt="image" src="https://github.com/user-attachments/assets/d0a314d3-bbbe-448c-986a-70c981f42948" />
   here owner can see overall rating for thier store, total reponses, comments, number of happy customer based on sentiment score

So this is overall completely working end to end project fullsssstack 









   


