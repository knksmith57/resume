My Resume
=========

There are [literally][1] [thousands][2] [of][3] [these][4] so-called "markdown" [resumes][5]
out there-- so why did I re-invent the wheel? The short answer is that
I couldn't find any solutions that, I felt, looked good in Markdown, HTML,
_and_ PDF form. Now I'm not saying this way is the best way for _you_, but I do
think it's the best way for **me**.

I will say, right away, that [Mike White] has a [really nice solution][1]
that uses [Pandoc] and looks very clean. You should definitely check his out
before hacking around with this one, as his is inherently more flexible.

## Quick Start

```
git clone https://github.com/knksmith57/resume.git
cd resume && npm install
grunt
```

## How it works

The actual [resume file] is located at `app/resume.md`. When you run the
[grunt] build, this file is rendered with [grunt-markdown] and injected into
`app/index.jst` between the `<%=content%>` [tags].

## Pros

1. Clean
2. Responsive
3. Looks good in plain text, HTML, and PDF form
4. No JavaScript (come on bro, analytics don't count.)

If you've looked at the [resume file], you've probably noticed that, unlike
most of the other markdown [resumes][5] out there, mine doesn't use [MMD] and it
doesn't contain any non-semantic markup (short of the _slightly_ non-semantic
h3 headers under the Experience section. I will most likely be removing these
in the next version). This was super important to me because I wanted my resume
to look as clean and simple from the terminal as it does in [PDF].

## Cons

1. **NOT** even a little bit flexible.
2. Terribly wasteful CSS rules

When figuring out how to keep as much non-semantic markup out of my `resume.md`
file as possible, I realized something: [CSS selectors] have come a _really_
long way. Purist design folks would probably murder me for the redundant and
wasteful style rules I've used, but let's be honest here: would you rather have
a few _hundred_ lines of crappy CSS in a file that most people will never see,
or even 1 line of weird non-semantic gibberish smack-dab in the middle of your
"clean" plain-text resume?

That's a no-brainer for me.

My solution is **NOT** flexible. I've made it very easy to add new content, and
very hard to change the way that _anything_ looks. For me, that's _exactly_
what I want.  This site is clean, responsive, and lean where it counts.

## Contributing

Pull requests are always welcome, or you can get at me with any suggestions -->
[@knksmith57]. If you find any bugs or browser-specific issues, I'd _really_
appreciate a heads up. Thanks for stopping by!

## License

It's all yours under [Creative Commons CC0](http://creativecommons.org/publicdomain/zero/1.0/)


[resume file]:      app/resume.md
[grunt]:            http://gruntjs.com/getting-started
[grunt-markdown]:   https://github.com/treasonx/grunt-markdown
[tags]:             app/index.jst#L25
[Pandoc]:           http://johnmacfarlane.net/pandoc/
[MMD]:              http://fletcherpenney.net/multimarkdown/
[PDF]:              app/kyle-smith-resume.pdf
[CSS selectors]:    http://net.tutsplus.com/tutorials/html-css-techniques/the-30-css-selectors-you-must-memorize/
[@knksmith57]:      http://twitter.com/knksmith57

[Mike White]:       https://github.com/mwhite
[1]:                https://github.com/mwhite/resume
[2]:                https://github.com/there4/markdown-resume
[3]:                https://github.com/icco/Resume
[4]:                https://github.com/c0bra/markdown-resume-js
[5]:                https://github.com/flaviozantut/markdown-resume
