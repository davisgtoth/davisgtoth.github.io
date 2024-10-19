#!/usr/bin/python3

import cv2
import numpy as np

# img = cv2.imread('desert_img.jpg')
img = cv2.imread('desert_img2.jpg')
cv2.imshow('image', img)
cv2.waitKey(0)
cv2.imwrite('desert2/img1.jpg', img)

uh = 37; us = 98; uv = 255
lh = 13; ls = 35; lv = 179
lower_hsv = np.array([lh, ls, lv])
upper_hsv = np.array([uh, us, uv])
hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv_img, lower_hsv, upper_hsv)
cv2.imshow('image', mask)
cv2.waitKey(0)
cv2.imwrite('desert2/img2.jpg', mask)

contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
# contour_img = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)
# cv2.drawContours(contour_img, contours, -1, (0, 255, 0), 2)
# cv2.imshow('image', contour_img)
# cv2.waitKey(0)

contour_colour_img = img.copy()
cv2.drawContours(contour_colour_img, contours, -1, (0, 255, 0), 2)
cv2.imshow('image', contour_colour_img)
cv2.waitKey(0)
cv2.imwrite('desert2/img3.jpg', contour_colour_img)

contours = [cnt for cnt in contours if cv2.arcLength(cnt, True) > 750
                    and cv2.boundingRect(cnt)[3] > 125 ]
filtered_contour_img = img.copy()
# filtered_contour_img = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)
cv2.drawContours(filtered_contour_img, contours, -1, (0, 255, 0), 2)
cv2.imshow('image', filtered_contour_img)
cv2.waitKey(0)
cv2.imwrite('desert2/img4.jpg', filtered_contour_img)

epsilon = 0.01 * cv2.arcLength(contours[0], True)
approx_cnts = [cv2.approxPolyDP(cnt, epsilon, True) for cnt in contours]
approx_contour_img = img.copy()
cv2.drawContours(approx_contour_img, approx_cnts, -1, (0, 0, 255), 2)
cv2.imshow('image', approx_contour_img)
cv2.waitKey(0)
cv2.imwrite('desert2/img5.jpg', approx_contour_img)

blank_img = np.zeros_like(img)
pid_image = cv2.fillPoly(blank_img, approx_cnts, (255, 255, 255))
cv2.imshow('image', pid_image)
cv2.waitKey(0)
cv2.imwrite('desert2/img6.jpg', pid_image)

height, width = img.shape[:2]
left = right = -1
buffer = 250
pid_image = cv2.cvtColor(pid_image, cv2.COLOR_BGR2GRAY)
for i in range(width):
    if pid_image[height - buffer, i] == 255 and left == -1:
        left = i
    elif pid_image[height - buffer, i] == 255 and left != -1: 
        right = i
pid_image = cv2.cvtColor(pid_image, cv2.COLOR_GRAY2BGR)
cv2.line(pid_image, (0, height - buffer), (width, height - buffer), (0, 255, 0), 2)
cv2.circle(pid_image, (left, height - buffer), 5, (0, 0, 255), -1)
cv2.circle(pid_image, (right, height - buffer), 5, (0, 0, 255), -1)
cv2.imshow('image', pid_image)
cv2.waitKey(0)
cv2.imwrite('desert2/img7.jpg', pid_image)

centre = (left + right) // 2
cv2.line(img, (0, height - buffer), (width, height - buffer), (0, 255, 0), 2)
cv2.circle(img, (left, height - buffer), 5, (0, 0, 255), -1)
cv2.circle(img, (right, height - buffer), 5, (0, 0, 255), -1)
cv2.circle(img, (centre, height - buffer), 5, (0, 0, 255), -1)
cv2.line(img, (width // 2, 0), (width // 2, height), (0, 255, 0), 2)
cv2.line(img, (centre, height - buffer), (width // 2, height - buffer), (255, 0, 0), 2)
cv2.putText(img, "error", (width // 2 + 10, height - buffer - 15), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)
cv2.imshow('image', img)
cv2.waitKey(0)
cv2.imwrite('desert2/img8.jpg', img)