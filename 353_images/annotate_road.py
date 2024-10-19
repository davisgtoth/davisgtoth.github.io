#!/usr/bin/python3

import cv2

img = cv2.imread('road_img.jpg')
# img = cv2.imread('sign_img.jpg')
cv2.imshow('image', img)
cv2.waitKey(0)
# cv2.imwrite('road2/img1.jpg', img)

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
mask = cv2.inRange(gray, 200, 255)
cv2.imshow('image', mask)
cv2.waitKey(0)
# cv2.imwrite('road2/img2.jpg', mask)

height, width = img.shape[:2]
left = right = -1
buffer = 200
for i in range(width):
    if mask[height - buffer, i] == 255 and left == -1:
        left = i
    elif mask[height - buffer, i] == 255 and left != -1: 
        right = i

mask_rgb = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)
cv2.line(mask_rgb, (0, height - buffer), (width, height - buffer), (0, 255, 0), 2)
cv2.imshow('image', mask_rgb)
cv2.waitKey(0)
# cv2.imwrite('road2/img3.jpg', mask_rgb)

cv2.circle(mask_rgb, (left, height - buffer), 5, (0, 0, 255), -1)
cv2.circle(mask_rgb, (right, height - buffer), 5, (0, 0, 255), -1)
cv2.imshow('image', mask_rgb)
cv2.waitKey(0)
# cv2.imwrite('road2/img4.jpg', mask_rgb)

cv2.line(img, (0, height - buffer), (width, height - buffer), (0, 255, 0), 2)
cv2.circle(img, (left, height - buffer), 5, (0, 0, 255), -1)
cv2.circle(img, (right, height - buffer), 5, (0, 0, 255), -1)
cv2.imshow('image', img)
cv2.waitKey(0)
# cv2.imwrite('road2/img5.jpg', img)

centre = (left + right) // 2
cv2.circle(img, (centre, height - buffer), 5, (0, 0, 255), -1)
cv2.imshow('image', img)
cv2.waitKey(0)
# cv2.imwrite('road2/img6.jpg', img)

cv2.rectangle(img, (width // 2, 0), (width // 2, height), (0, 255, 0), 2)
cv2.imshow('image', img)
cv2.waitKey(0)
# cv2.imwrite('road2/img7.jpg', img)

cv2.line(img, (centre, height - buffer), (width // 2, height - buffer), (255, 0, 0), 2)
cv2.putText(img, "error", (width // 2 + 10, height - buffer - 15), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)
cv2.imshow('image', img)
cv2.waitKey(0)
# cv2.imwrite('road2/img8.jpg', img)