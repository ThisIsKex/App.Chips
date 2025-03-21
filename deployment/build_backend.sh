cd ../api
mkdir deployment_artifacts
uv export --frozen --no-dev --no-editable -o deployment_artifacts/requirements.txt
cd deployment_artifacts
uv pip install \
    --no-installer-metadata \
    --no-compile-bytecode \
    --python-platform aarch64-manylinux2014 \
    --python 3.13 \
    --target packages \
    -r requirements.txt

cd packages
zip -r ../deployment_artifact.zip . -x "*.dist-info/*" -x "*.pyc" -x "*.pyo" -x "__pycache__/*" -x ".DS_Store"
cd ..
cd ..
zip -r deployment_artifacts/deployment_artifact.zip app -x "app/*.dist-info/*" "app/*.pyc" "app/*.pyo" "app/__pycache__/*" "app/.DS_Store"
mv deployment_artifacts/deployment_artifact.zip ../deployment/deployment_artifact.zip
rm -rf deployment_artifacts
