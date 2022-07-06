#!/bin/bash
set -e

pg_restore -U postgres -d dvdrental /tmp/dump/dvdrental.tar