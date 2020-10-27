#!/usr/bin/env python3

import os
import datetime
import sys
import subprocess

commands = {
    "build_backend": "docker build -t aivenproxy_backend .",
    "run_backend_dev": "docker run -v " + os.getcwd() + "/backend:/app -p 80:80 aivenproxy_backend /start-reload.sh"
}

command_names = {
    "build_backend": "Build backend",
    "run_backend_dev": "Run backend (development)",
    "start_frontend": "npm start"
}

def check_input_for_errors(select):
    if len(commands.keys()) >= select:
        return select
    print(str(select) + " is not in the list to be selected")
    sys.exit(1)

def get_passed_arguments():
    if len(sys.argv) > 1:
        first_arg = sys.argv[1]
        if first_arg not in commands.keys():
            print(first_arg + " is not an option!")
            sys.exit(1)
        return first_arg
    return None

def get_user_input():
    try:
        user_input = input()
        return int(user_input)
    except ValueError:
        print(user_input + " is not an integer!")
        sys.exit(1)
    except KeyboardInterrupt:
        sys.exit(1)

def make_user_select_from_menu():
    print("\nPass ./run.py command_name - to directly execute options without menu")
    command_list = [""]
    for c, option in enumerate(commands.keys(), 1):
        command_list.append(option)
        print(str(c) + ") " + command_names[option] + " (" + option + ")")
    print("Select operation: ")
    user_selection = get_user_input()
    check_input_for_errors(user_selection)
    return command_list[user_selection]


selection = get_passed_arguments()

if not selection:
    selection = make_user_select_from_menu()

response = subprocess.run(
    commands[selection],
    shell=True,
    cwd=os.getcwd(),
    executable="/bin/bash"
)
