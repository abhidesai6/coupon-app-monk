# Ouput of API  :
***

### GET /api/coupons 
Get all coupons 
![image](https://github.com/user-attachments/assets/2724d042-ef81-40fa-ba41-7b0839a3bb78) 
#### JSON : 
```
[
    {
        "_id": "673e28dcd9d3383395e03eb2",
        "type": "cart-wise",
        "details": {
            "threshold": 100,
            "discount": 10
        },
        "isActive": true,
        "createdAt": "2024-11-20T18:22:20.362Z",
        "__v": 0
    },
    {
        "_id": "673e297ad9d3383395e03eb6",
        "type": "product-wise",
        "details": {
            "product_id": "123",
            "discount": 20
        },
        "isActive": true,
        "createdAt": "2024-11-20T18:24:58.505Z",
        "__v": 0
    },
    {
        "_id": "673e2a2210bf94ac4842a093",
        "type": "bxgy",
        "details": {
            "buy_products": [
                {
                    "product_id": 1,
                    "quantity": 3
                },
                {
                    "product_id": 2,
                    "quantity": 3
                }
            ],
            "get_products": [
                {
                    "product_id": 3,
                    "quantity": 1
                }
            ],
            "repition_limit": 3
        },
        "isActive": true,
        "createdAt": "2024-11-20T18:27:46.733Z",
        "__v": 0
    }
]
```

***

### POST /api/coupon
Create Coupon 
![image](https://github.com/user-attachments/assets/2571eff3-af6e-41f5-81f3-13d6b841212b)

```
{
    "message": "Coupon created successfully.",
    "coupon": {
        "type": "bxgy",
        "details": {
            "buy_products": [
                {
                    "product_id": 3,
                    "quantity": 3
                },
                {
                    "product_id": 4,
                    "quantity": 3
                }
            ],
            "get_products": [
                {
                    "product_id": 5,
                    "quantity": 1
                }
            ],
            "repition_limit": 1
        },
        "isActive": true,
        "_id": "673e2f6710bf94ac4842a096",
        "createdAt": "2024-11-20T18:50:15.491Z",
        "__v": 0
    }
}
```

***

### GET /api/coupon/:id 
Get coupon by ID 
![image](https://github.com/user-attachments/assets/f65e15cc-d2df-41d4-a509-8699b90ad805)

```
{
    "_id": "673e28dcd9d3383395e03eb2",
    "type": "cart-wise",
    "details": {
        "threshold": 100,
        "discount": 10
    },
    "isActive": true,
    "createdAt": "2024-11-20T18:22:20.362Z",
    "__v": 0
}
```

***

### PUT /api/coupon/:id
Update coupon ny ID 
![image](https://github.com/user-attachments/assets/7e335449-6f51-4673-8f88-480565aace14)

```
{
    "message": "Coupon updated successfully.",
    "coupon": {
        "_id": "673e28dcd9d3383395e03eb2",
        "type": "cart-wise",
        "details": {
            "threshold": 95,
            "discount": 10
        },
        "isActive": true,
        "createdAt": "2024-11-20T18:22:20.362Z",
        "__v": 0
    }
}
```

***

### DELETE /api/coupon/:id 
Delete Coupon by ID 
![image](https://github.com/user-attachments/assets/0554c29b-4b77-45d5-98dc-0396d8b93bc9)
![image](https://github.com/user-attachments/assets/b617a406-d3e5-4876-af52-e39df0b07201)

***

### POST /api/cart/applicable-coupons 
Get Applicable coupon for your cart 

```
{
    "applicable_coupons": [
        {
            "coupon_id": "673e2a2210bf94ac4842a093",
            "type": "bxgy",
            "discount": 25
        },
        {
            "coupon_id": "673e331d10bf94ac4842a0a6",
            "type": "bxgy",
            "discount": 25
        }
    ]
}
```

***

### POST /api/cart/apply-coupon/:id 

Apply coupon API 

![image](https://github.com/user-attachments/assets/a77a2442-c131-4ef2-9cab-f8165515f4ea)

```
{
    "updated_cart": {
        "items": [
            {
                "product_id": 1,
                "quantity": 3,
                "price": 50
            },
            {
                "product_id": 2,
                "quantity": 3,
                "price": 30
            },
            {
                "product_id": 3,
                "quantity": 1,
                "price": 25
            }
        ],
        "total_price": 265,
        "total_discount": 25,
        "final_price": 240
    }
}
```





