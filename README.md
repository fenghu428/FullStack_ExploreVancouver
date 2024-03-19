# Explore Vancouver

README.md for Explore Vancouver App

## Project Website
https://full-stack-explore-vancouver.vercel.app/

## Introduction

The "Explore Vancouver" application is a dynamic full-stack web application designed for users to explore and search for attractions in Vancouver. It provides detailed information about various attractions, including museums, parks, ski resorts, and others. Users have the capability to view these details and add attractions to their favorites list. The application's database, storing both places and user information, is managed using MongoDB. For the backend, Express.js and Node.js have been utilized to ensure efficient and seamless data handling. The frontend is crafted using React, offering a user-friendly and interactive experience for those navigating through the attractions of Vancouver.

## Features

1. **Interactive Image Carousel:** A dynamic image carousel on the homepage showcasing scenic views of Vancouver.

2. **Search Functionality:** Allows users to search for various attractions in Vancouver.

3. **Featured Places:** Highlights popular attractions in Vancouver with links to detailed views.

4. **Category-Specific Listings:** Dedicated pages for 'Museums', 'Parks', 'Ski Resorts', and 'Other' attractions, each displaying relevant listings.

5. **User Favorites:** Users can mark attractions as favorites, with the functionality to view and manage them.

6. **User Authentication:** Features 'Login' and 'Register' options for user account creation and management.

7. **Responsive Design:** The application is designed to be responsive, ensuring a seamless experience across different devices.

## Database Structure

The "Explore Vancouver" application utilizes a structured database to efficiently manage and retrieve data. Here's an overview of the database structure:

1. **Users Collection:**

   - Stores user information for authentication and profile management.
   - Fields include `username`, `email`, `passwordHash`, and `favorites`.

2. **Places Collection:**

   - Contains detailed information about various attractions in Vancouver.
   - Includes fields like `title`, `description`, `category`, `address`, and `photo`.

3. **Favorites Sub-collection (within Users):**
   - A sub-collection within each user document to store their favorite places.
   - References `Places` collection items by their unique IDs.

This structure supports the functionality of the application by allowing efficient data retrieval for features like user authentication, searching, and categorizing attractions.

## Project Screenshot
1. **HomePage**
   ![HomePage](https://github.com/fenghu428/FullStack_ExploreVancouver/assets/132985204/46151ee2-8ed7-42ec-8175-cd84ea106fb4)

2. **Museums Page**
   ![Museums](https://github.com/fenghu428/FullStack_ExploreVancouver/assets/132985204/794bbac5-9dbc-4609-a2d9-de3a837ee1b8)

3. **Detail Page**
   ![DetailPage](https://github.com/fenghu428/FullStack_ExploreVancouver/assets/132985204/61d9dc1c-c92e-4190-aebe-4c1d8a4b76fd)

4. **Login Page**
   ![LoginPage](https://github.com/fenghu428/FullStack_ExploreVancouver/assets/132985204/d286d54e-687a-4df7-8ad8-169507be8e79)

5. **Register Page**
    ![Register](https://github.com/fenghu428/FullStack_ExploreVancouver/assets/132985204/4fabc2c5-5eb8-4d88-bf54-1f44bbcaaeaf)

6. **Detail Page**
   ![DetailPage](https://github.com/fenghu428/FullStack_ExploreVancouver/assets/132985204/55ba4dee-3fa2-4b58-ad48-d5af5292922c)

7. **Profile Page**
   ![ProfilePage](https://github.com/fenghu428/FullStack_ExploreVancouver/assets/132985204/df5f787c-5a3d-4262-961f-756390b82c35)

## Video of this project:

https://github.com/fenghu428/ExploreVancouver/assets/132985204/e56f8bc2-c23d-4973-a806-0839b2252d50
