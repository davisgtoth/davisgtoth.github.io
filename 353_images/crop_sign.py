#!/usr/bin/python3

import cv2
import numpy as np

# img = cv2.imread('road_img.jpg')
img = cv2.imread('sign_img.jpg')
img_clean = img.copy()
cv2.imshow('image', img)
cv2.waitKey(0)
# cv2.imwrite('sign2/img1.jpg', img)

lower_hsv = (5,20,0)
upper_hsv = (150,255,255)
hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
blue_mask = cv2.inRange(hsv_img, lower_hsv, upper_hsv)
blue_mask = cv2.bitwise_not(blue_mask)
cv2.imshow('image', blue_mask)
cv2.waitKey(0)
# cv2.imwrite('sign2/img2.jpg', blue_mask)

gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
sign_mask1 = cv2.inRange(gray_img, 95, 105)
sign_mask2 = cv2.inRange(gray_img, 195, 205)
sign_mask3 = cv2.inRange(gray_img, 115, 125)
sign_mask = cv2.bitwise_or(sign_mask1, sign_mask2)
sign_mask = cv2.bitwise_or(sign_mask, sign_mask3)
cv2.imshow('image', sign_mask)
cv2.waitKey(0)
# cv2.imwrite('sign2/img3.jpg', sign_mask)

combined_mask = cv2.bitwise_and(blue_mask, sign_mask)
cv2.imshow('image', combined_mask)
cv2.waitKey(0)
# cv2.imwrite('sign2/img4.jpg', combined_mask)

contours, _ = cv2.findContours(combined_mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
largest_contour = max(contours, key=cv2.contourArea)
contour_img = img.copy()
cv2.drawContours(contour_img, [largest_contour], -1, (0, 255, 0), 2)
cv2.imshow('image', contour_img)
cv2.waitKey(0)
# cv2.imwrite('sign2/img5.jpg', contour_img)

x, y, w, h = cv2.boundingRect(largest_contour)
epsilon = 0.03 * cv2.arcLength(largest_contour, True)
approx_polygon = cv2.approxPolyDP(largest_contour, epsilon, True)
approx_contour_img = img.copy()
cv2.drawContours(approx_contour_img, [approx_polygon], -1, (0, 0, 255), 2)
cv2.imshow('image', approx_contour_img)
cv2.waitKey(0)
# cv2.imwrite('sign2/img6.jpg', approx_contour_img)

corners = [point[0] for point in approx_polygon]
for corner in corners:
    cv2.circle(approx_contour_img, tuple(corner), 5, (255, 0, 0), -1)
cv2.imshow('image', approx_contour_img)
cv2.waitKey(0)
# cv2.imwrite('sign2/img7.jpg', approx_contour_img)

midpoint = int(len(corners)/2)
sorted_corner_points = sorted(corners, key=lambda point: point[0])
left = sorted(sorted_corner_points[:midpoint], key=lambda point: point[1])
right = sorted(sorted_corner_points[midpoint:], key=lambda point: point[1], reverse=True)

upperLeft = max((pt for pt in left), key=lambda p: p[1])
lowerLeft = min((pt for pt in left), key=lambda p: p[1])
upperRight = max((pt for pt in right), key=lambda p: p[1])
lowerRight = min((pt for pt in right), key=lambda p: p[1])

cv2.circle(img, upperLeft, 5, (0, 0, 255), -1)
cv2.circle(img, lowerLeft, 5, (0, 0, 255), -1)
cv2.circle(img, upperRight, 5, (0, 0, 255), -1)
cv2.circle(img, lowerRight, 5, (0, 0, 255), -1)
cv2.imshow('image', img)
cv2.waitKey(0)
# cv2.imwrite('sign2/img8.jpg', img)

height, width = img.shape[:2]
src_pts = np.array([lowerLeft, upperLeft, lowerRight, upperRight], dtype=np.float32)
dst_pts = np.array([[0, 0], [0, height], [width, 0], [width, height]], dtype=np.float32)
M = cv2.getPerspectiveTransform(src_pts, dst_pts)
cropped_img = cv2.warpPerspective(img_clean, M, (width, height))
cv2.imshow('image', cropped_img)
cv2.waitKey(0)
# cv2.imwrite('sign2/img9.jpg', cropped_img)