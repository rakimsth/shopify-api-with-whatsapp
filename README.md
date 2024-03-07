# Introduction

The Shopify Admin API lets you build apps and integrations that extend and enhance the Shopify admin using Admin APIs provided by the Shopify.

# Goal

The purpose of the project is to generate the discount code for the shopify store using the shopify admin api and send the generate discount code to the customer using whatsapp web package.

# Steps to get Shopify Access token

- Create shopify account
- Add card to enable the shopify store
- Get the shopify store name from the store url (https://name.myshopify.com)
- Visit https://admin.shopify.com/store/{Add your store name}/settings/apps/development
- Create an app
- Configure admin API Scopes (enable discount and price list read and write scope etc.)
- Copy the API (start with sh...)
- Use that in the .env file

# Run Application

The application can be start by running the script

- `npm i`
- `npm run dev`

# Link Whatsapp

- Upon running application, the app will prompt to scan the whatsapp QR code in the `terminal`.

- Scan the QR code through the phone in Link devices section in whatsapp.

- This will store the session in the session folder which can be used for future purposes.

- You will see the message `Whatsapp Client is ready` message in the terminal.

# Make Request to send Discount code

- Use the API Endpoint to create the automated discount code

  - /api/v1/create-discount-codes (POST)

- You will see the Shopify API response from the endpoint.
