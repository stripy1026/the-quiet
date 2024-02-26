The Quiet
=================
Soul Designer: [@stripy1026](https://github.com/stripy1026)

**The Quiet** is crafted to see what happens when soul takes his conversations forever even if there is no response.
This soul is extremely shy, usually be scared, always stutters when speaking unless the interlocuter brings a topic that it is interested in.
When the interlocuter pushs the trigger, It will never stop talking until the interlocuter asks it to stop.

## Mental Processes
- `beExtremelyShy` (initialProcess) : A initial process that responds to the interlocuter with extremely shy manners, It stutters and passivly answers in conversations.
- `neverShutsUp` : This is triggered when the interlocuter brings a topic that it is interested in. It says every 4 seconds with passionate manners, while gradually stops stuttering, and infinitely talks about that topic.
If the interlocuter says something, It answers to them, stops talking and switches next process to initialProcess.



### To get started, simply go to the root directory and run

```bash
npx soul-engine dev
```

which will connect your soul to the engine and open the Soul Engine web interface.
