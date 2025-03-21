import os
import shutil
import subprocess
import zipfile


def create_deployment_artifact():
    os.chdir("../api")
    os.makedirs("deployment_artifacts", exist_ok=True)

    subprocess.run(
        [
            "uv",
            "export",
            "--frozen",
            "--no-dev",
            "--no-editable",
            "-o",
            "deployment_artifacts/requirements.txt",
        ],
        check=True,
    )

    os.chdir("deployment_artifacts")
    subprocess.run(
        [
            "uv",
            "pip",
            "install",
            "--no-installer-metadata",
            "--no-compile-bytecode",
            "--python-platform",
            "aarch64-manylinux2014",
            "--python",
            "3.13",
            "--target",
            "packages",
            "-r",
            "requirements.txt",
        ],
        check=True,
    )

    os.chdir("packages")
    with zipfile.ZipFile("../deployment_artifact.zip", "w") as zipf:
        for root, dirs, files in os.walk("."):
            for file in files:
                if not any(
                    excluded in os.path.join(root, file)
                    for excluded in [
                        ".dist-info",
                        ".pyc",
                        ".pyo",
                        "__pycache__",
                        ".DS_Store",
                    ]
                ):
                    zipf.write(os.path.join(root, file))

    os.chdir("..")
    os.chdir("..")
    with zipfile.ZipFile("deployment_artifacts/deployment_artifact.zip", "a") as zipf:
        for root, dirs, files in os.walk("app"):
            for file in files:
                if not any(
                    excluded in os.path.join(root, file)
                    for excluded in [
                        ".dist-info",
                        ".pyc",
                        ".pyo",
                        "__pycache__",
                        ".DS_Store",
                    ]
                ):
                    zipf.write(os.path.join(root, file))

    shutil.move(
        "deployment_artifacts/deployment_artifact.zip",
        "../deployment/deployment_artifact.zip",
    )
    shutil.rmtree("deployment_artifacts")


if __name__ == "__main__":
    create_deployment_artifact()
