---
group: graphql
title: Customer endpoint
---

A customer is a user who has created a a store account.  The `Customer` endpoint can be used to query a specific customer account or change an account's password.

GraphQL supports following types of authentication for `customer` objects:

* [OAuth tokens]({{ page.baseurl }}/get-started/authentication/gs-authentication-oauth.html)
* [Session authentication]({{ page.baseurl }}/get-started/authentication/gs-authentication-session.html)

To use session authentication, you must be logged in as a customer in the same browser you are using to make GraphQL calls. The GraphQL call returns information about this customer.

## Query structure

`customer: Customer`

### Input parameters

Not applicable

### Output parameters

#### Customer object  {#Customer}

Attribute |  Data Type | Description
--- | --- | ---
`addresses` | [[CustomerAddresses](#CustomerAddresses)]  | An array containing the customer's shipping and billing addresses
`created_at` | String | Timestamp indicating when the account was created
`default_billing` | String | The ID assigned to the billing address
`default_shipping` | String | The ID assigned to the shipping address
`dob` | String | The customer's date of birth
`email` | String | The customer's email address. Required
`firstname` | String | The customer's first name
`group_id` | Int | The group assigned to the user. Default values are 0 (Not logged in), 1 (General), 2 (Wholesale), and 3 (Retailer)
`id` | Int | The ID assigned to the customer
`is_subscribed` | Boolean | Indicates whether the customer is subscribed to the company's newsletter
`lastname` | String | The customer's family name
`middlename` |String | The customer's middle name
`prefix` | String | An honorific, such as Dr., Mr., or Mrs.
`suffix` | String | A value such as Sr., Jr., or III
`taxvat` | String | The customer's Tax/VAT number (for corporate customers)
{:style="table-layout:auto;"}

#### CustomerAddress object {#CustomerAddresses}

The values assigned to attributes such as `firstname` and `lastname` in this object may be different from those defined in the Customer object.

Attribute |  Data Type | Description
--- | --- | ---
`city` | String | The city or town
`company` | String | The customer's company
`country_id` | String | The customer's country
`customer_id` | Int | The customer ID
`default_billing` | Boolean | Indicates whether the address is the default billing address
`default_shipping` | Boolean | Indicates whether the address is the default shipping address
`fax` | String | The fax number
`firstname` | String | The first name of the person associated with the shipping/billing address
`id` | Int | The ID assigned to the address object
`lastname` | String | The family name of the person associated with the shipping/billing address
`middlename` | String | The middle name of the person associated with the shipping/billing address
`postcode` | String | The customer's ZIP or postal code
`prefix` | String | An honorific, such as Dr., Mr., or Mrs.
`region_id` | Int | A number that uniquely identifies the state, province, or other area
`region` | [CustomerAddressesRegion](#CustomerAddressesRegion) | An object containing the region name, region code, and region ID
`reward_update_notification` | Int | The number of the email template to use for notifications about reward updates. This attribute is defined in the Reward module.
`reward_warning_notification` | Int | The number of the email template to use for notifications about rewards points expiring. This attribute is defined in the Reward module.
`street` | [String] | An array of strings that define the street number and name
`suffix` | String | A value such as Sr., Jr., or III
`telephone` | String | The telephone number
`vat_id` | String | The customer's Tax/VAT number (for corporate customers)
{:style="table-layout:auto;"}

#### CustomerAddressesRegion object {#CustomerAddressesRegion}

Attribute |  Data Type | Description
--- | --- | ---
`region` | String | The state or province name
`region_code` | String |The address region code
`region_id` | Int | An integer that uniquely identifies the region
{:style="table-layout:auto;"}

## Mutations

Magento 2.3.0 supports the `changeCustomerPassword` mutation only.

```
mutation {
  changeCustomerPassword(
    currentPassword: String,
    newPassword: String
  ) Customer
```

### Input parameters

Attribute |  Data Type | Description
--- | --- | ---
`currentPassword` | String | The customer's current password
`newPassword` | String | The customer's changed password

### Output parameters

The `changeCustomerPassword` returns the [`Customer`](#Customer) object. 

## Example usage

### Query

The following query returns information about the logged-in customer.

**Request**

```
{
  customer
  {
    firstname
    lastname
    suffix
    email
    id
      addresses{
        firstname
        lastname
        street
        city
        region_id
        postcode
        country_id
        telephone
    }
   }
}
```

**Response**

``` json
{
  "data": {
    "customer": {
      "firstname": "John",
      "lastname": "Doe",
      "suffix": null,
      "email": "jdoe@example.com",
      "id": 3,
      "addresses": [
        {
          "firstname": "John",
          "lastname": "Doe",
          "street": [
            "123 Elm Street"
          ],
          "city": "Anytown",
          "region_id": 57,
          "postcode": "78758",
          "country_id": "US",
          "telephone": "512 555-1212"
        }
      ]
    }
  }
}
```

### Mutation

The following mutation changes the password for the logged in customer.  

**Request**

```
mutation {
  changeCustomerPassword(
    currentPassword: "Password1",
    newPassword: "Mag3ntoR0cks!"
  ) {
    id
    email
    firstname
    lastname
  }
}
```

**Response**

```json
{
  "data": {
    "customer": {
      "id": 3,
      "email": "jdoe@example.com",
      "firstname": "John",
      "lastname": "Doe"
    }
  }
}
```