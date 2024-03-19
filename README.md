# Explore Vancouver

README.md for Explore Vancouver App

# Project Website
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

Video of this project:

https://github.com/fenghu428/ExploreVancouver/assets/132985204/e56f8bc2-c23d-4973-a806-0839b2252d50
