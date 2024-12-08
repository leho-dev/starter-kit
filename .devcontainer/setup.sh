#!/bin/bash

USER="node"
ZSH_CUSTOM="/home/$USER/.oh-my-zsh/custom"
ZSHRC_PATH="/home/$USER/.zshrc"
HISTFILE_PATH="/commandhistory/.zsh_history"

echo "==> Setting configuration..."
echo "==> Current user: $(whoami)"

echo "==> Setting zsh..."

echo "==> Installing Oh My Zsh plugins..."
if [ -d "$ZSH_CUSTOM/plugins/zsh-autosuggestions" ]; then
  echo "==> zsh-autosuggestions already installed."
else
  git clone https://github.com/zsh-users/zsh-autosuggestions "$ZSH_CUSTOM/plugins/zsh-autosuggestions"
fi

if [ -d "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting" ]; then
  echo "==> zsh-syntax-highlighting already installed."
else
  git clone https://github.com/zsh-users/zsh-syntax-highlighting "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"
fi

if ! grep -q "zsh-autosuggestions" "$ZSHRC_PATH"; then
  echo "==> Adding zsh-autosuggestions to .zshrc..."
  echo "plugins=(git zsh-autosuggestions zsh-syntax-highlighting)" >> "$ZSHRC_PATH"
  echo "source \$ZSH/oh-my-zsh.sh" >> "$ZSHRC_PATH"
fi

echo "==> Setting up history file..."

if [ ! -d "/commandhistory" ]; then
  mkdir -p /commandhistory
  chown $USER:$USER /commandhistory
  echo "==> Created /commandhistory directory."
fi

if [ ! -f "$HISTFILE_PATH" ]; then
  touch "$HISTFILE_PATH"
  chown $USER:$USER "$HISTFILE_PATH"
  echo "==> Created .zsh_history file at /commandhistory."
fi

if ! grep -q "HISTFILE" "$ZSHRC_PATH"; then
  echo "==> Adding HISTFILE to .zshrc..."
  echo "export HISTFILE=$HISTFILE_PATH" >> "$ZSHRC_PATH"
fi

echo "==> Reloading .zshrc..."
zsh -c "source $ZSHRC_PATH"

echo "==> Setup zsh done!"

echo "==> Setup completed!"
