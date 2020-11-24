# Software Engineering Excellence

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.


<!-- vim-markdown-toc GFM -->

* [Commands](#commands)
* [Deployment](#deployment)
    * [Deployment to AWS](#deployment-to-aws)
* [Copyright & Licensing](#copyright--licensing)

<!-- vim-markdown-toc -->

## Commands

| Command       | Description                                                                                                                          |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| `npm install` | Installs all dependencies                                                                                                            |
| `npm start`   | Starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server |
| `npm build`   | Generates static content into the `build` directory and can be served using any static contents hosting service                      |

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Deployment to AWS

Deployment of the built webpage to AWS or deployment of the infrastructure itself both rely on the presence of a _profile_ named `software-engineering-excellence` in your AWS Configuration.

This profile will be set to use the credentials of a user you have created - this user must be able to assume the `software_engineering_excellence_administrator` role on the AWS account which runs the infrastructure.

Set the profile with the following command:

```
# Provide the credentials of the user who can assume the role below:
aws_access_key_id="<KEY_ID>"
aws_secret_access_key="<ACCESS_KEY>"

# Set the credentials for the _user_.
profile="software-engineering-excellence"
user="${profile}-user"
aws configure --profile "${user}" set aws_access_key_id "${aws_access_key_id}"
aws configure --profile "${user}" set aws_secret_access_key "${aws_secret_access_key}"

# Create the _profile_ which uses the user above to assume the appropriate role.
aws configure --profile "${profile}" set source_profile "${user}"
aws configure --profile "${profile}" set region "ap-southeast-1"
aws configure --profile "${profile}" set role_arn arn:aws:iam::705383350627:role/software_engineering_excellence_administrator
```

Once you have configured the profile, you can use the following commands to manage the deployment:

| Command               | Description                                   |
|-----------------------|-----------------------------------------------|
| `make infrastructure` | Creates the static site infrastructure.       |
| `make build`          | Build the static site.                        |
| `make deploy`         | Deploy the static site to the infrastructure. |

Note that _initial_ setup of the cross account role is handled with the script in `./infrastructure/bootstrap`. This file will have to be run by an account administrator and shouldn't need to be updated for general use.

## Copyright & Licensing

[![Creative Commons BY-NC-SA](https://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-nc-sa/3.0/).

All content is Copyright (©) Tobias Büschel.
