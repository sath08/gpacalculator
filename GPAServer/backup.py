# importing the modules
import os
import shutil

# Providing the folder path
origin = 'C:\Users\sathk\OneDrive\Desktop\gpacalculator\GPAServer\data\'
target = 'C:\Users\sathk\OneDrive\Desktop\gpacalculator\GPAServer\backup\'

# Fetching the list of all the files
files = os.listdir(origin)

# Fetching all the files to directory
for file_name in files:
   shutil.copy(origin+file_name, target+file_name)
print("Files are copied successfully")
