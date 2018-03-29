'use babel';

import MyPackageAtomView from './my-package-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  myPackageAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myPackageAtomView = new MyPackageAtomView(state.myPackageAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myPackageAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-package-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myPackageAtomView.destroy();
  },

  serialize() {
    return {
      myPackageAtomViewState: this.myPackageAtomView.serialize()
    };
  },

  toggle() {
    console.log('MyPackageAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
