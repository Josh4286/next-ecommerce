Thanks for checking my repository out!
Just a reminder that this is still a work in progress that I will continue to pushed live unfinished so that people can see the progress :)

NOTE: Due to performance issues each site/page load currently takes around 3 second to run. This is a known issue due to low tier servers in America.

E-Commerce Project
Stack: Next Js, Mongo DB, Express js, Node js

---

What I Learnt from this project:

Css Grid, Css variables
Storing JSON in cookies
Context API basics - reducers
Next Js - slug, dynamic routing, server-side rendering
Pushing NextJS to production
Understanding CDNs importance - due to slow speed from Netlify's US East server
How little I know :')
How to seed data to MongoDB cloud database

---

Planned Features:

Implementing Paypal
Implementing Stripe
Using 3rd Party to store images.
Better mobile responsiveness
User to be able to view orders
Admin Panel and admin users
Charts to show sales/profits/etc

---

Current Issues:

Mobile responsiveness - Will fix in future

Client side and serverside validation - future solutions include address mobile validation from a maps API and mobile number checker API.

Slow performance due to NextJS images - https://answers.netlify.com/t/next-js-image-is-really-slow-on-netlify/34258 solutions include lazy loading or hosting images from somewhere else closer to Sydney.

PayPal card button doubles up - I just have not got to this yet :(

PayPal buttons work when the delivery form is not yet filled - I'm still getting to that :(

Card Infomation section in cart does not validate yet and does not take a CVV or expiry date or name - This is due to future planning to implement stripe to accept card payments. The current card number field is just a placeholder

All users can view any orders even orders other users have created - Still getting to that

Users can't see their orders - I haven't made the view order list page yet, but they can see the order they made by typing the orderID in the URL parameter... :(

Users can't see their profile - I haven't made the profile page yet :(

Lots of unused code - because I am still working on them! I'm pushing the site live when I get to a point where the site isn't too broken
