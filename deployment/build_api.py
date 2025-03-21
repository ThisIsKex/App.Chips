import os
import shutil


def create_deployment_artifact():
    os.chdir("../api")
    os.makedirs("deployment_artifacts", exist_ok=True)

    os.system(
        "uv export --frozen --no-dev --no-editable -o deployment_artifacts/requirements.txt"
    )

    os.chdir("deployment_artifacts")
    os.system(
        "uv pip install --no-installer-metadata --no-compile-bytecode --python-platform aarch64-manylinux2014 --python 3.13 --target packages -r requirements.txt"
    )

    shutil.make_archive(
        "../deployment_artifact",
        "zip",
        "packages",
        exclude=["*.dist-info/*", "*.pyc", "*.pyo", "__pycache__/*", ".DS_Store"],
    )

    os.chdir("..")
    shutil.make_archive(
        "deployment_artifacts/deployment_artifact",
        "zip",
        "app",
        exclude=[
            "app/*.dist-info/*",
            "app/*.pyc",
            "app/*.pyo",
            "app/__pycache__/*",
            "app/.DS_Store",
        ],
    )

    shutil.move(
        "deployment_artifacts/deployment_artifact.zip",
        "../deployment/deployment_artifact.zip",
    )
    shutil.rmtree("deployment_artifacts")


if __name__ == "__main__":
    create_deployment_artifact()
