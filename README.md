# Doctor Information API

REST API for managing medical practitioner data with MongoDB storage.

---

## Data Structure

Each doctor record contains:

| Field            | Type    | Required | Validation                      | Description                  |
|------------------|---------|----------|---------------------------------|------------------------------|
| practice_name    | String  | Yes      | Max 100 chars                   | Medical practice name        |
| first_name       | String  | Yes      | Max 50 chars                    | Doctor's first name          |
| surname          | String  | Yes      | Max 50 chars                    | Doctor's last name           |
| practice_number  | String  | Yes      | 6-20 characters                 | Unique practice ID           |
| phone_number     | String  | No       | Valid phone format              | Contact number               |
| whatsapp_number  | String  | No       | Valid phone format              | WhatsApp contact             |
| email            | String  | No       | Valid email format              | Professional email           |
| specialty        | String  | Yes      | From predefined list            | Medical specialty            |
| latitude         | Number  | Yes      | -90 to 90                       | Practice location latitude   |
| longitude        | Number  | Yes      | -180 to 180                     | Practice location longitude  |
| isActive         | Boolean | No       | -                               | Account status (true/false)  |

---

## API Endpoints

**Base URL:** `http://localhost:3000/api/doctors`

### 1. Create Doctor
`POST /`
curl -X POST -H "Content-Type: application/json" -d '{
  "practice_name": "Coastal Medical",
  "first_name": "James",
  "surname": "Wilson",
  "practice_number": "CM-4456",
  "specialty": "Pediatrics",
  "latitude": -33.9249,
  "longitude": 18.4241
}' http://localhost:3000/api/doctors

2. List Doctors
`GET /`
curl "http://localhost:3000/api/doctors?page=2&limit=5"
Parameters:
page: Page number (default: 1)
limit: Items per page (default: 10)

3. Get Single Doctor
`GET /:id`
curl http://localhost:3000/api/doctors/507f1f77bcf86cd799439011

5. Update Doctor
`PATCH /:id`
curl -X PATCH -H "Content-Type: application/json" -d '{
  "phone_number": "+27 21 556 7890",
  "email": "james.w@coastalmed.co.za"
}' http://localhost:3000/api/doctors/507f1f77bcf86cd799439011

7. Delete Doctor
`DELETE /:id`
curl -X DELETE http://localhost:3000/api/doctors/507f1f77bcf86cd799439011
