# cmi-www

This is [The Library of Christ Mind Teachings](https://www.christmind.info) website.

[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=bTdXQ29vU1E3L2MxMWE2ejRPRUxNYzNWQ2d4OWNlbWlaOWtYck9Scjdobz0tLTU5RmFyT2RKRnZJK2hFc2lmZlc3WlE9PQ==--d44e5271e5a76c527ac0a85aa2fa0a2a70490c13)](https://www.browserstack.com/automate/public-build/bTdXQ29vU1E3L2MxMWE2ejRPRUxNYzNWQ2d4OWNlbWlaOWtYck9Scjdobz0tLTU5RmFyT2RKRnZJK2hFc2lmZlc3WlE9PQ==--d44e5271e5a76c527ac0a85aa2fa0a2a70490c13)

As of March 19, 2019, The Library includes the following teachings:

* A Course In Miracles Sparkly Edition (cmi-acim)
* A Course Of Love, partially included here because it is not officially
  approved (cmi-acol)
* The Impersonal Life (cmi-jsb)
* The Raj Material (cmi-raj)
* The Way of Mastery (cmi-wom)

This is a Jekyll site and with increasing size build times became longer
and longer. As a result each teaching is developed as its own Jekyll
site with the output directed to a subdirectory, named "t" in this project.

The project is hosted by Netlify which deploys to production from Github
after a "master" branch push.

## Local Development

For local development clone the following repositories into a common parent directory.

* cmi-acim
* cmi-acol
* cmi-jsb
* cmi-raj
* cmi-wom
* cmi-www

Build the site and watch for changes by running the following command in the root directory of each repository.

```
$ npm start
```

Doing so will set JEKYLL_ENV=development and direct the output to cmi-www/_site/t. The full site can be tested from localhost:9999. The url of each teaching is given below.

* cmi-acim: t/acim
* cmi-acol: t/acol
* cmi-jsb:  t/jsb
* cmi-raj:  t/raj
* cmi-wom:  t/wom
* cmi-www:  /

## Preview Deployment to Netlify

This will build a publicly available site in a temporary Netlify domain. 

Copy _build.dev.sh to the parent directory, the one containing all cloned repositories. Follow these steps:

1.  Stop "npm start" command running in all repositories by pressing ^C.
2.  Change directory to the parent, where _build.dev.sh was copied.
3.  To build in development mode each project, run the command;

    ```
    $ ./_build.dev.sh
    ```

    The output from each project goes to cmi-www/t. This is included in the final build step, that of cmi-www and output to _site.

4.  Change directory to cmi-www
5.  Deploy to netlify by running:

    ```
    $ netlify deploy
    ```

## Production Deploy to Netlify

The process is nearly the same as the preview deploy.

1.  Copy the _build.prod.sh script to the parent directory.
2.  Make sure 'npm start' is not running for all repositories.
3.  Change directory to parent and run

    ```
    $ ./_build.prod.sh
    ```
4.  Deploy to Netlify production by running:

    ```
    $ netlify deploy --prod
    ```
5.  The site will be available at https://www.christmind.info.

Note: The Auto deploy feature of Netlify is disabled so we don't have to track (git) the output of the separate build commands that are in cmi-www/t.

