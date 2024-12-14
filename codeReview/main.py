import subprocess
import openai
import os

# Set up your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Specify the file types to check
FILE_TYPES = [
    ".py",
    ".js",
    ".cjs",
    ".ts",
]  # You can add other extensions like ".cjs", ".js", ".ts", ".py"


def get_changed_files():
    """Retrieve all changed files in the current Git branch compared to the main branch."""
    try:
        # Get the list of changed files
        result = subprocess.run(
            [
                "git",
                "diff",
                "--name-only",
                "origin/main",
            ],  # Adjust "main" to your default branch
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        if result.returncode != 0:
            raise Exception(result.stderr)

        files = result.stdout.strip().split("\n")
        return [
            file for file in files if any(file.endswith(ext) for ext in FILE_TYPES)
        ]  # Filter for specified file types
    except Exception as e:
        print(f"Error retrieving changed files: {e}")
        return []


def review_code(file_path):
    """Reads code from a file and sends it to ChatGPT for review."""
    try:
        with open(file_path, "r") as file:
            code_content = file.read()

        # Create the prompt for ChatGPT
        prompt = f"""
          You are an expert software developer and code reviewer. Review the following code for:
          1. Bugs or issues.
          2. Code quality improvements.
          3. Best practices or missing comments.

          Code:
          {code_content}

          Provide a detailed review with specific suggestions.
        """

        # Use the OpenAI Chat API
        response = openai.ChatCompletion.create(
            model="gpt-4",  # Replace with the model you have access to
            messages=[
                {"role": "system", "content": "You are an expert software developer."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=1500,
        )

        # Extract the response text
        review = response["choices"][0]["message"]["content"]
        return review

    except Exception as e:
        return f"An error occurred: {e}"


def main():
    print("Finding changed files...")
    changed_files = get_changed_files()

    if not changed_files:
        print(f"No {', '.join(FILE_TYPES)} files changed. Exiting.")
        return

    print(f"Changed files: {', '.join(changed_files)}")

    for file_path in changed_files:
        if os.path.exists(file_path):
            print(f"\nReviewing file: {file_path}")
            review = review_code(file_path)
            print("\nChatGPT Code Review Output:")
            print(review)
        else:
            print(f"File not found: {file_path}")


if __name__ == "__main__":
    main()
