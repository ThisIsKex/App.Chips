import shutil
import os

# Define paths
package_dir = "package"
zip_file = "cash_session_handler.zip"

# Create package directory if it doesn't exist
os.makedirs(package_dir, exist_ok=True)

# Install dependencies
os.system(f"pip install --target {package_dir} -r ../api/requirements.txt")

# Copy Lambda function
shutil.copy("../api/cash_session_handler.py", package_dir)

# Create ZIP file
shutil.make_archive("cash_session_handler", "zip", package_dir)

print(f"Created {zip_file} successfully!")
